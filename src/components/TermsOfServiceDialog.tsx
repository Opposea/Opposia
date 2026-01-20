import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsOfServiceDialogProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const TermsOfServiceDialog = ({ open, onAccept, onDecline }: TermsOfServiceDialogProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [hasConsentedOrientation, setHasConsentedOrientation] = useState(false);
  const [hasAgreedNoMoney, setHasAgreedNoMoney] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setHasScrolledToBottom(false);
      setHasAccepted(false);
      setHasConsentedOrientation(false);
      setHasAgreedNoMoney(false);
      // Reset scroll position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [open]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;
      if (isAtBottom) {
        setHasScrolledToBottom(true);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onDecline()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Terms of Service</DialogTitle>
          <DialogDescription>
            Please read and accept our terms of service to continue with registration.
          </DialogDescription>
        </DialogHeader>
        
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 max-h-[50vh] border rounded-md overflow-y-auto"
        >
          <div className="p-4 space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">OPPOSIA LTD</h3>
              <h4 className="font-semibold text-foreground mb-1">TERMS OF SERVICE</h4>
              <p className="text-xs text-muted-foreground">Version 2.2 | Last Updated: 14/01/2026</p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">1. Agreement to These Terms</h4>
                <p className="text-sm text-muted-foreground">
                  Opposia Ltd ("Opposia", "we", "us", "our") provides the Opposia website, apps, and related services (the "Service"). By accessing or using the Service you agree to these Terms, our Privacy Policy, Acceptable Use Policy, Safety & Moderation Policy, and Refund Policy. These Terms form a legally binding contract between you and Opposia Ltd.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">2. Eligibility</h4>
                <p className="text-sm text-muted-foreground">
                  You must be 18 or older to use the Service. You represent and warrant that you can enter into a binding contract and are not prohibited from using the Service under applicable law. We may ask for information to confirm eligibility/age. If we reasonably believe you are under 18, we may suspend or terminate your account.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">3. Account Registration & Security</h4>
                <p className="text-sm text-muted-foreground">
                  You must provide accurate, current, and complete information and keep it up to date. You are responsible for safeguarding your login credentials and for all activity on your account. Notify us promptly at support@opposia.com if you suspect unauthorised use. You must not share your account or allow others to access it.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">4. User Content and Licence</h4>
                <p className="text-sm text-muted-foreground">
                  "Your Content" means content you upload, post, transmit, or otherwise make available on the Service. You are solely responsible for Your Content and your interactions with other users. You grant Opposia a worldwide, non-exclusive, royalty-free licence to host, store, reproduce, display, and otherwise use Your Content only as necessary to operate, provide, secure, and improve the Service. We will not use Your Content in advertising or marketing without your explicit permission. You retain ownership of Your Content.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">5. How the Service Works; User Responsibility</h4>
                <p className="text-sm text-muted-foreground">
                  Opposia provides tools for introduction and communication. We do not guarantee matches or outcomes. We do not routinely conduct criminal background checks, and we do not guarantee any user's identity, intentions, or conduct. You are responsible for your interactions with others. Use caution and good judgment when communicating, sharing information, or meeting in person. Do not send money or financial information to other users.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">6. Safety, Reporting, and Moderation</h4>
                <p className="text-sm text-muted-foreground">
                  We provide reporting and blocking tools and may implement safety measures consistent with our Policies and applicable law (including UK online safety obligations). If you report behaviour, we may review and take action based on a reasonable assessment and our Policies. We cannot monitor all behaviour or guarantee removal of all objectionable content. You use the Service at your own risk.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">7. Intellectual Property</h4>
                <p className="text-sm text-muted-foreground">
                  The Service (excluding Your Content) including software, design, trademarks, and branding is owned by or licensed to Opposia and protected by IP laws. You may not copy, modify, distribute, sell, lease, reverse engineer, or attempt to extract source code except where permitted by law.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">8. Privacy and Data Protection</h4>
                <p className="text-sm text-muted-foreground">
                  We process personal data as described in our Privacy Policy. Where we rely on consent under data protection law (including explicit consent for special category data), we will obtain it through an appropriate in-app flow. Nothing in these Terms limits your statutory data protection rights.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">9. Paid Features & Billing</h4>
                <p className="text-sm text-muted-foreground">
                  Some features may require payment. Prices will be shown before you purchase in GBP. Subscriptions renew automatically unless cancelled. Fees are non-refundable except where required by law or stated in our Refund Policy. This does not affect your statutory rights.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">10. Consumer Rights (UK)</h4>
                <p className="text-sm text-muted-foreground">
                  If you are a consumer, UK consumer laws provide legal rights for digital content and services. These Terms do not remove those rights. Where the Consumer Contracts Regulations 2013 apply, you may have cancellation rights.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">11. Limitation of Liability</h4>
                <p className="text-sm text-muted-foreground">
                  Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or breaches of statutory rights. Subject to the above, our total aggregate liability is limited to the greater of the amount you paid us for Paid Features in the 12 months before the event, or £100.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">12. Suspension and Termination</h4>
                <p className="text-sm text-muted-foreground">
                  You may terminate your account at any time via settings. We may suspend or terminate accounts where you breach these Terms/Policies, your use creates risk or harm, we must comply with law, or we are discontinuing the Service. Where reasonably possible, we will provide notice and an opportunity to appeal.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">13. Complaints and Support</h4>
                <p className="text-sm text-muted-foreground">
                  For complaints about the Service or other users, contact support@opposia.com. We aim to acknowledge complaints within 5 working days. If you are a consumer, you may submit a complaint via the UK's Online Dispute Resolution platform.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">14. Changes to These Terms</h4>
                <p className="text-sm text-muted-foreground">
                  We may update these Terms. If changes are material, we will give at least 30 days' notice by email and/or in-app notice. Continued use after the effective date means you accept the updated Terms.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">15. Governing Law and Jurisdiction</h4>
                <p className="text-sm text-muted-foreground">
                  These Terms are governed by the laws of England and Wales. If you are a consumer in the UK, you may bring proceedings in the courts of the part of the UK where you live.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">16. Contact</h4>
                <p className="text-sm text-muted-foreground">
                  Opposia Ltd, 167–169 Great Portland Street, 5th Floor, London, W1W 5PF. Email: support@opposia.com
                </p>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold text-foreground text-center mb-2">ACCEPTABLE USE POLICY</h4>
                <p className="text-xs text-muted-foreground text-center mb-3">Version 1.2 | Last Updated: 14/01/2026</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Prohibited Conduct</h4>
                <p className="text-sm text-muted-foreground">
                  You must not use Opposia to: harass, bully, threaten, or intimidate others; post hateful content; send unsolicited sexual content; solicit sexual services or facilitate exploitation; engage in illegal activity; impersonate others; share private information without permission; attempt to contact minors; send spam; upload malware or bypass security measures; violate intellectual property rights; evade enforcement actions; or create fraudulent profiles.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Enforcement</h4>
                <p className="text-sm text-muted-foreground">
                  We may remove content, limit features, suspend, or terminate accounts for breaches, consistent with the Terms and our moderation processes. We may report suspected illegal activity to relevant authorities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {!hasScrolledToBottom && (
          <p className="text-sm text-muted-foreground text-center py-2">
            ↓ Please scroll down to read all terms before accepting ↓
          </p>
        )}

        {hasScrolledToBottom && (
          <div className="space-y-3 py-2">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="accept-terms" 
                checked={hasAccepted}
                onCheckedChange={(checked) => setHasAccepted(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="accept-terms" className="text-sm cursor-pointer leading-tight">
                I have read and agree to the Terms of Service, Privacy Policy, and Acceptable Use Policy
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="consent-orientation" 
                checked={hasConsentedOrientation}
                onCheckedChange={(checked) => setHasConsentedOrientation(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="consent-orientation" className="text-sm cursor-pointer leading-tight">
                I explicitly consent to my sexual orientation being processed to provide me with relevant matches
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="agree-no-money" 
                checked={hasAgreedNoMoney}
                onCheckedChange={(checked) => setHasAgreedNoMoney(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="agree-no-money" className="text-sm cursor-pointer leading-tight">
                I will not under any circumstances give other users any money
              </Label>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button 
            onClick={onAccept} 
            disabled={!hasScrolledToBottom || !hasAccepted || !hasConsentedOrientation || !hasAgreedNoMoney}
          >
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceDialog;