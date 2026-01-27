import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import rugboostLogo from '@/assets/rugboost-logo.svg';

const PrivacyPolicy = () => {
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
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 27, 2025</p>
        </div>

        <Card className="shadow-medium">
          <CardContent className="p-6 md:p-8 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-foreground/90 leading-relaxed">
                RugBoost ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our rug inspection and management platform.
              </p>
            </section>

            <Separator />

            {/* Information We Collect */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Information We Collect</h2>
              </div>
              
              <div className="space-y-4 pl-11">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Business name and address (for business accounts)</li>
                    <li>Account credentials</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Rug and Job Information</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>Photographs of rugs for inspection and analysis</li>
                    <li>Rug specifications (dimensions, type, condition notes)</li>
                    <li>Service estimates and work history</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Payment Information</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>Payment transactions are processed securely through Stripe</li>
                    <li>We do not store complete credit card numbers on our servers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>Device information and browser type</li>
                    <li>IP address and general location</li>
                    <li>Pages visited and features used</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">How We Use Your Information</h2>
              </div>
              
              <ul className="list-disc list-inside text-foreground/80 space-y-2 pl-11">
                <li>To provide and maintain our rug inspection and management services</li>
                <li>To generate AI-powered analysis and cost estimates for rug restoration</li>
                <li>To process payments and send transaction confirmations</li>
                <li>To communicate with you about your account and services</li>
                <li>To improve our platform and develop new features</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <Separator />

            {/* Data Security */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Data Security</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p>
                  We implement industry-standard security measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                  <li>Secure authentication with password hashing</li>
                  <li>Role-based access controls</li>
                  <li>Regular security audits and monitoring</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Third-Party Services */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Third-Party Services</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p>We use trusted third-party services to operate our platform:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Stripe:</strong> For secure payment processing</li>
                  <li><strong>Cloud Infrastructure:</strong> For data storage and hosting</li>
                  <li><strong>AI Services:</strong> For rug analysis and estimate generation</li>
                  <li><strong>Email Services:</strong> For transactional communications</li>
                </ul>
                <p className="mt-2">
                  Each third-party service has its own privacy policy governing their use of your data.
                </p>
              </div>
            </section>

            <Separator />

            {/* Your Rights */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Your Rights</h2>
              </div>
              
              <div className="space-y-3 pl-11 text-foreground/80">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Contact */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">Contact Us</h2>
              </div>
              
              <p className="pl-11 text-foreground/80">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{' '}
                <a href="mailto:privacy@rugboost.com" className="text-primary hover:underline">
                  privacy@rugboost.com
                </a>
              </p>
            </section>

            <Separator />

            {/* Changes */}
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-foreground">Changes to This Policy</h2>
              <p className="text-foreground/80">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
