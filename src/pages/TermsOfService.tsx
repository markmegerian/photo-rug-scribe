import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, CreditCard, AlertTriangle, ShieldCheck, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import rugboostLogo from '@/assets/rugboost-logo.svg';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={rugboostLogo} alt="RugBoost" className="h-8 w-8" />
            <span className="font-display text-lg font-bold text-foreground">RugBoost</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 27, 2025</p>
        </div>

        <Card className="shadow-medium">
          <CardContent className="p-6 md:p-8 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-foreground/90 leading-relaxed">
                Welcome to RugBoost. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
              </p>
            </section>

            <Separator />

            {/* Acceptance of Terms */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Acceptance of Terms</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p>
                  By creating an account or using RugBoost, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                </p>
                <p>
                  If you do not agree to these terms, you may not access or use our services.
                </p>
              </div>
            </section>

            <Separator />

            {/* Service Description */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Service Description</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p>
                  RugBoost provides a platform for rug cleaning and restoration professionals to:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Capture and organize rug inspection photos</li>
                  <li>Generate AI-powered analysis and cost estimates</li>
                  <li>Manage client communications and approvals</li>
                  <li>Process payments for services</li>
                  <li>Track job progress and service completion</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* User Accounts */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">User Accounts</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p><strong>Account Responsibilities:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized access to your account</li>
                  <li>You may not share your account with others or allow others to access your account</li>
                </ul>
                
                <p className="mt-4"><strong>Account Types:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Staff Accounts:</strong> For rug cleaning professionals managing inspections and jobs</li>
                  <li><strong>Client Accounts:</strong> For customers viewing estimates and making payments</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Payment Terms */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Payment Terms</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p><strong>Client Payments:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>All payments are processed securely through Stripe</li>
                  <li>Payments are made directly to the service provider (rug cleaning business)</li>
                  <li>Refunds are handled at the discretion of the service provider</li>
                </ul>
                
                <p className="mt-4"><strong>Platform Fees:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>RugBoost may charge platform fees for payment processing</li>
                  <li>Fee structures will be clearly communicated to service providers</li>
                  <li>Fees are subject to change with reasonable notice</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* AI Analysis Disclaimer */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">AI Analysis Disclaimer</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p>
                  Our AI-powered rug analysis is intended to assist professionals in creating estimates. Please note:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>AI analysis is a tool to assist, not replace, professional judgment</li>
                  <li>Service providers should review and adjust AI-generated estimates as needed</li>
                  <li>Final estimates and service recommendations are the responsibility of the service provider</li>
                  <li>RugBoost is not liable for inaccuracies in AI-generated content</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Acceptable Use */}
            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Acceptable Use</h2>
              
              <div className="space-y-3 text-foreground/80">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use the platform for any unlawful purpose</li>
                  <li>Upload malicious content, viruses, or harmful code</li>
                  <li>Attempt to gain unauthorized access to any part of the platform</li>
                  <li>Impersonate another user or entity</li>
                  <li>Interfere with or disrupt the platform's operation</li>
                  <li>Scrape or collect data from the platform without permission</li>
                  <li>Use the platform to send spam or unsolicited communications</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Limitation of Liability */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Gavel className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Limitation of Liability</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p>
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>RugBoost provides the platform "as is" without warranties of any kind</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid by you in the past 12 months</li>
                  <li>We are not responsible for disputes between service providers and their clients</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Termination */}
            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Termination</h2>
              
              <div className="space-y-3 text-foreground/80">
                <p>
                  We may suspend or terminate your account if you violate these Terms of Service. You may also request account deletion at any time by contacting us.
                </p>
                <p>
                  Upon termination, your right to use the platform ceases immediately. We may retain certain data as required by law or for legitimate business purposes.
                </p>
              </div>
            </section>

            <Separator />

            {/* Governing Law */}
            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Governing Law</h2>
              
              <p className="text-foreground/80">
                These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes shall be resolved through binding arbitration or in the courts of competent jurisdiction.
              </p>
            </section>

            <Separator />

            {/* Changes to Terms */}
            <section className="space-y-4">
              <h2 className="font-display text-xl font-semibold text-foreground">Changes to These Terms</h2>
              
              <p className="text-foreground/80">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <Separator />

            {/* Contact */}
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-foreground/80">
                If you have questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@rugboost.com" className="text-primary hover:underline">
                  legal@rugboost.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsOfService;
