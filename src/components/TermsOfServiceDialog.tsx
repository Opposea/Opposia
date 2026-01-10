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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setHasScrolledToBottom(false);
      setHasAccepted(false);
      setHasConsentedOrientation(false);
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
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Terms and Conditions</h3>
              <p className="text-sm text-muted-foreground">Last updated: March 2024</p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h4>
                <p className="text-sm text-muted-foreground">
                  By accessing and using Opposites Attract, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service. These terms constitute a legally binding agreement between you and Opposites Attract.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">2. Eligibility</h4>
                <p className="text-sm text-muted-foreground">
                  You must be at least 18 years old to use our service. By creating an account, you represent and warrant that you are at least 18 years of age. Users in the United Kingdom may be subject to additional age verification requirements as mandated by local regulations.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">3. User Conduct</h4>
                <p className="text-sm text-muted-foreground">
                  You agree to use our service respectfully and lawfully. Harassment, hate speech, bullying, threatening behavior, or any other inappropriate behavior will result in immediate account termination. You must not impersonate other individuals or create fake profiles. All information provided must be accurate and truthful.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">4. Account Security</h4>
                <p className="text-sm text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with these security obligations.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">5. Content Ownership</h4>
                <p className="text-sm text-muted-foreground">
                  You retain ownership of the content you post, but grant us a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute that content on our platform. You represent that you have all necessary rights to grant this license and that your content does not infringe upon the rights of any third party.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">6. Privacy Policy</h4>
                <p className="text-sm text-muted-foreground">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our service, you also agree to our Privacy Policy. We comply with GDPR, CCPA, and other applicable data protection regulations.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">7. Service Modifications</h4>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify, suspend, or discontinue our service at any time, with or without notice. We may also update these terms from time to time. Continued use of the service after any such changes constitutes your acceptance of the new terms.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">8. Sexual Orientation Data Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Processing of your sexual orientation is essential for showing you potential matches within your stated preference. This special category data is collected and processed solely for the purpose of providing you with relevant matching services. Without this information, we cannot provide our core matchmaking functionality. By using our service, you explicitly consent to the processing of your sexual orientation data for these purposes.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">9. User Vigilance and Responsibility</h4>
                <p className="text-sm text-muted-foreground">
                  We can only take action if a user reports abuse, harassment, bot activity, or scammers. It is entirely up to the user to be vigilant. By agreeing to these Terms of Service, you agree that you are in sound mind to make such judgments independently. We encourage all users to report any suspicious activity, but the responsibility for personal safety and judgment when interacting with other users remains with you.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">10. Limitation of Liability</h4>
                <p className="text-sm text-muted-foreground">
                  To the fullest extent permitted by law, we are not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of our service or from any interactions with other users. This includes but is not limited to damages for loss of profits, data, or other intangible losses.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">11. Dispute Resolution</h4>
                <p className="text-sm text-muted-foreground">
                  Any disputes arising from these terms or your use of our service shall be governed by the laws of England and Wales. You agree to submit to the exclusive jurisdiction of the courts of England and Wales for the resolution of any disputes.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">12. Contact Information</h4>
                <p className="text-sm text-muted-foreground">
                  For questions about these terms, please contact us at legal@oppositesattract.com. We will endeavor to respond to all inquiries within a reasonable timeframe.
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
                I have read and agree to the Terms of Service and Privacy Policy
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
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button 
            onClick={onAccept} 
            disabled={!hasScrolledToBottom || !hasAccepted || !hasConsentedOrientation}
          >
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceDialog;
