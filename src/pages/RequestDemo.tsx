import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Send, ArrowLeft, Check } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { trackContactFormSubmit } from '@/lib/analytics';
import { plans } from '@/data/plans';
import rugboostLogo from '@/assets/rugboost-horizontal.svg';

const demoSchema = z.object({
  name: z.string().trim().min(1, { message: 'Please enter your name' }).max(100, { message: 'Name must be less than 100 characters' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }).max(255, { message: 'Email must be less than 255 characters' }),
  company: z.string().trim().max(120, { message: 'Business name must be less than 120 characters' }).optional(),
  plan: z.string().trim().max(50),
  inquiry: z.string().trim().min(1, { message: 'Please tell us a little about your business' }).max(1000, { message: 'Please keep it under 1000 characters' }),
});

export default function RequestDemo() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPlan = plans.find((p) => p.id === searchParams.get('plan'))?.name ?? '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    plan: initialPlan,
    inquiry: '',
    website: '', // honeypot
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = demoSchema.safeParse(form);
    if (!result.success) {
      toast({
        title: 'Please check the form',
        description: result.error.issues[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { plan, company, inquiry, name, email } = result.data;
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name,
          email,
          subject: `Demo request${plan ? ` — ${plan} plan` : ''}`,
          message: [company ? `Business: ${company}` : null, plan ? `Plan of interest: ${plan}` : null, '', inquiry]
            .filter((line) => line !== null)
            .join('\n'),
          website: form.website,
        },
      });
      if (error) throw error;

      trackContactFormSubmit();
      navigate('/thank-you', { replace: true, state: { name } });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Please try again in a moment.';
      toast({ title: 'Could not send your request', description: message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={rugboostLogo} alt="Rugboost" className="h-6 w-auto" />
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Request a Demo
            </h1>
            <p className="text-muted-foreground">
              Tell us about your shop and we'll walk you through Rugboost on a live call.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your details</CardTitle>
              <CardDescription>We reply within one business day.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} maxLength={100} placeholder="Jane Smith" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} maxLength={255} placeholder="jane@rugshop.com" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Business name (optional)</Label>
                    <Input id="company" name="company" value={form.company} onChange={handleChange} maxLength={120} placeholder="Smith Rug Care" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan of interest</Label>
                    <select
                      id="plan"
                      name="plan"
                      value={form.plan}
                      onChange={handleChange}
                      className="w-full rounded-none border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10"
                    >
                      <option value="">Not sure yet</option>
                      {plans.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry">What would you like to see?</Label>
                  <Textarea
                    id="inquiry"
                    name="inquiry"
                    value={form.inquiry}
                    onChange={handleChange}
                    rows={5}
                    maxLength={1000}
                    placeholder="We inspect about 40 rugs a month and want faster estimates…"
                    required
                  />
                </div>

                <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
                  <Label htmlFor="website">Website (leave blank)</Label>
                  <Input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send request
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  No credit card. No obligation.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
