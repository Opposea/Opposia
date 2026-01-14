import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Please read these terms carefully before using our service.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">OPPOSIA LTD</h2>
              <h3 className="text-2xl font-semibold text-foreground mb-4">TERMS OF SERVICE</h3>
              <p className="text-muted-foreground">Version: 2.2</p>
              <p className="text-muted-foreground">Last Updated: 14/01/2026</p>
            </div>
            
            <div className="space-y-8">
              {/* Section 1 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">1. Agreement to These Terms</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>1.1</strong> Opposia Ltd (Company No. 16955158) ("Opposia", "we", "us", "our") provides the Opposia website, apps, and related services (the "Service").</p>
                  <p><strong>1.2</strong> By accessing or using the Service you agree to these Terms, our Privacy Policy, Acceptable Use Policy, Safety & Moderation Policy, and Refund Policy (together, the "Agreement"). If you do not agree, do not use the Service.</p>
                  <p><strong>1.3</strong> These Terms form a legally binding contract between you and Opposia Ltd.</p>
                  <p><strong>1.4</strong> If you use the Service on behalf of a business or other entity, you confirm you have authority to bind that entity, and "you" includes that entity.</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">2. Eligibility</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>2.1</strong> You must be 18 or older to use the Service.</p>
                  <p><strong>2.2</strong> You represent and warrant that: (a) you can enter into a binding contract; and (b) you are not prohibited from using the Service under applicable law.</p>
                  <p><strong>2.3</strong> We may ask for information to confirm eligibility/age. If we reasonably believe you are under 18, we may suspend or terminate your account.</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">3. Account Registration & Security</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>3.1</strong> You must provide accurate, current, and complete information and keep it up to date.</p>
                  <p><strong>3.2</strong> You are responsible for safeguarding your login credentials and for all activity on your account. Notify us promptly at support@opposia.com if you suspect unauthorised use.</p>
                  <p><strong>3.3</strong> You must not share your account or allow others to access it.</p>
                  <p><strong>3.4</strong> We may refuse registration or suspend/terminate accounts in accordance with Section 11 (Termination) and our Policies.</p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">4. User Content and Licence</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>4.1</strong> "Your Content" means content you upload, post, transmit, or otherwise make available on the Service (including photos, messages, bios, and prompts).</p>
                  <p><strong>4.2</strong> You are solely responsible for Your Content and your interactions with other users. You warrant that you have all rights needed to provide Your Content and that it does not infringe laws or third-party rights.</p>
                  <p><strong>4.3</strong> <em>Licence to operate the Service:</em> You grant Opposia a worldwide, non-exclusive, royalty-free licence to host, store, reproduce, display, and otherwise use Your Content only as necessary to operate, provide, secure, and improve the Service (including delivering messages and displaying profiles to other users per your settings).</p>
                  <p><strong>4.4</strong> <em>No marketing use without permission:</em> We will not use Your Content (especially your photos/messages) in advertising or marketing materials without your explicit permission, except where the content is anonymised/aggregated so it cannot reasonably identify you.</p>
                  <p><strong>4.5</strong> You retain ownership of Your Content, subject to the licence above.</p>
                  <p><strong>4.6</strong> We may remove or restrict access to Your Content where we reasonably believe it breaches these Terms/Policies or applicable law, or to protect users.</p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">5. How the Service Works; User Responsibility</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>5.1</strong> Opposia provides tools for introduction and communication. We do not guarantee matches or outcomes.</p>
                  <p><strong>5.2</strong> <em>No background checks:</em> We do not routinely conduct criminal background checks, and we do not guarantee any user's identity, intentions, or conduct. Any verification features (if offered) are limited to what we describe in-app and are not a safety guarantee.</p>
                  <p><strong>5.3</strong> You are responsible for your interactions with others. Use caution and good judgment when communicating, sharing information, or meeting in person. Do not send money or financial information to other users.</p>
                  <p><strong>5.4</strong> You acknowledge that offline meetings/interactions are at your own risk, and we are not a party to user-to-user interactions.</p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">6. Safety, Reporting, and Moderation</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>6.1</strong> We provide reporting and blocking tools and may implement safety measures consistent with our Policies and applicable law (including UK online safety obligations).</p>
                  <p><strong>6.2</strong> If you report behaviour, we may review and take action (warning, limiting features, suspension, termination) based on a reasonable assessment and our Policies.</p>
                  <p><strong>6.3</strong> We cannot monitor all behaviour or guarantee removal of all objectionable content. You use the Service at your own risk.</p>
                  <p><strong>6.4</strong> <em>Appeals:</em> If we take a significant enforcement action (e.g., suspension/termination), you may appeal by contacting support@opposia.com. We may request additional information to review the decision.</p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>7.1</strong> The Service (excluding Your Content) including software, design, trademarks, and branding is owned by or licensed to Opposia and protected by IP laws.</p>
                  <p><strong>7.2</strong> You may not copy, modify, distribute, sell, lease, reverse engineer, or attempt to extract source code except where permitted by law.</p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">8. Privacy and Data Protection</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>8.1</strong> We process personal data as described in our Privacy Policy.</p>
                  <p><strong>8.2</strong> Where we rely on consent under data protection law (including explicit consent for special category data), we will obtain it through an appropriate in-app flow, and you can withdraw it as described in the Privacy Policy.</p>
                  <p><strong>8.3</strong> Nothing in these Terms limits your statutory data protection rights.</p>
                </div>
              </div>

              {/* Section 9 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">9. Paid Features, Subscriptions, and Billing (if applicable)</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>9.1</strong> Some features may require payment ("Paid Features"). Prices will be shown before you purchase and are in GBP (unless stated otherwise).</p>
                  <p><strong>9.2</strong> <em>Auto-renewal:</em> Subscriptions renew automatically unless cancelled. You can cancel through your account settings or the app store/payment method used before the renewal date to avoid being charged for the next period.</p>
                  <p><strong>9.3</strong> <em>Changes to pricing:</em> We may change prices with at least 30 days' notice for existing subscribers. If you do not agree, you can cancel before the change takes effect.</p>
                  <p><strong>9.4</strong> <em>Refunds:</em> Fees are non-refundable except where required by law or expressly stated in our Refund Policy. This does not affect your statutory rights.</p>
                  <p><strong>9.5</strong> If you purchase through a third-party app store, that store's billing terms also apply.</p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">10. Consumer Rights (UK)</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>10.1</strong> If you are a consumer, UK consumer laws provide legal rights for digital content and services (including that the Service must be provided with reasonable care and skill). These Terms do not remove those rights.</p>
                  <p><strong>10.2</strong> Where the Consumer Contracts Regulations 2013 apply to a purchase, you may have cancellation rights. Where you ask us to begin supplying digital services immediately, you may be asked to acknowledge that cancellation rights can be affected as permitted by law.</p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">11. Limitation of Liability</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>11.1</strong> Nothing in these Terms limits or excludes liability that cannot be limited by law, including liability for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>(a) death or personal injury caused by our negligence;</li>
                    <li>(b) fraud or fraudulent misrepresentation; or</li>
                    <li>(c) breaches of statutory rights that cannot be excluded under consumer law.</li>
                  </ul>
                  <p><strong>11.2</strong> Subject to 11.1, we are not liable for losses not caused by our breach, or for indirect/consequential losses.</p>
                  <p><strong>11.3</strong> Subject to 11.1 and to the extent permitted by law, our total aggregate liability to you for all claims arising out of or relating to the Service in any 12-month period is limited to the greater of:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>(a) the amount you paid us for Paid Features in the 12 months before the event giving rise to the claim; or</li>
                    <li>(b) £100.</li>
                  </ul>
                  <p><strong>11.4</strong> We are not responsible for the conduct of any user or for any user-generated content, except where we have failed to comply with our legal obligations, including those set out in the Online Safety Act 2023.</p>
                </div>
              </div>

              {/* Section 12 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">12. Suspension and Termination</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>12.1</strong> <em>By you:</em> You may terminate your account at any time via settings.</p>
                  <p><strong>12.2</strong> <em>By us:</em> We may suspend or terminate, or limit features, where we reasonably believe:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>(a) you breached these Terms/Policies;</li>
                    <li>(b) your use creates risk or harm to other users, the Service, or us;</li>
                    <li>(c) we must do so to comply with law; or</li>
                    <li>(d) we are discontinuing the Service.</li>
                  </ul>
                  <p><strong>12.3</strong> Where reasonably possible, we will provide notice and an opportunity to appeal, except where doing so would: (a) risk harm; (b) compromise investigations; or (c) be unlawful.</p>
                  <p><strong>12.4</strong> On termination, your right to use the Service ends. Sections intended to survive (including 4, 7, 8, 11, 12, 14) remain in effect.</p>
                </div>
              </div>

              {/* Section 13 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">13. Complaints and Support</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>13.1</strong> For complaints about the Service or other users, contact support@opposia.com.</p>
                  <p><strong>13.2</strong> We aim to acknowledge complaints within 5 working days and respond within a reasonable time depending on complexity.</p>
                  <p><strong>13.3</strong> <em>Online Dispute Resolution:</em> If you are a consumer, you may submit a complaint via the UK's Online Dispute Resolution platform at <a href="https://www.resolve-disputes.service.gov.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.resolve-disputes.service.gov.uk</a>.</p>
                </div>
              </div>

              {/* Section 14 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">14. Changes to These Terms</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>14.1</strong> We may update these Terms. If changes are material, we will give at least 30 days' notice by email and/or an in-app notice.</p>
                  <p><strong>14.2</strong> Continued use after the effective date means you accept the updated Terms. If you do not agree, stop using the Service and close your account.</p>
                </div>
              </div>

              {/* Section 15 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">15. Governing Law and Jurisdiction</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>15.1</strong> These Terms are governed by the laws of England and Wales.</p>
                  <p><strong>15.2</strong> If you are a consumer living in the UK, you may bring proceedings in the courts of the part of the UK where you live (England/Wales, Scotland, or Northern Ireland). Otherwise, the courts of England and Wales will have jurisdiction.</p>
                </div>
              </div>

              {/* Section 16 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">16. Contact</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Opposia Ltd</strong></p>
                  <p>167–169 Great Portland Street, 5th Floor, London, W1W 5PF</p>
                  <p>Email: <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a></p>
                </div>
              </div>

              {/* Acceptable Use Policy */}
              <div className="mt-16 pt-8 border-t">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">ACCEPTABLE USE POLICY</h2>
                  <h3 className="text-xl font-semibold text-foreground mb-4">OPPOSIA LTD</h3>
                  <p className="text-muted-foreground">Version: 1.2</p>
                  <p className="text-muted-foreground">Last Updated: 14/01/2026</p>
                </div>

                <div className="space-y-8">
                  {/* AUP Section 1 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h3>
                    <p className="text-muted-foreground">
                      This Acceptable Use Policy ("AUP") forms part of the Agreement. Capitalised terms have the same meaning as in the Terms of Service.
                    </p>
                  </div>

                  {/* AUP Section 2 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">2. Prohibited Conduct</h3>
                    <p className="text-muted-foreground mb-4">You must not use Opposia to:</p>
                    <div className="space-y-3 text-muted-foreground">
                      <p><strong>2.1 Harass or harm others:</strong> harass, bully, threaten, intimidate, stalk, shame, or encourage self-harm or violence.</p>
                      <p><strong>2.2 Hate or discrimination:</strong> post content or engage in behaviour that is hateful or promotes violence or hatred based on protected characteristics.</p>
                      <p><strong>2.3 Unsolicited sexual content / cyberflashing:</strong> send or share unsolicited sexual images, explicit content, or content intended to sexually harass.</p>
                      <p><strong>2.4 Sexual exploitation:</strong> solicit sexual services, facilitate trafficking, or exploit others.</p>
                      <p><strong>2.5 Illegal activity:</strong> engage in unlawful, fraudulent, or deceptive conduct (including scams and financial manipulation).</p>
                      <p><strong>2.6 Impersonation:</strong> impersonate a person/entity or misrepresent affiliation.</p>
                      <p><strong>2.7 Privacy invasion:</strong> share another person's private/confidential information without permission (doxxing).</p>
                      <p><strong>2.8 Minors:</strong> attempt to contact, exploit, or harm minors, or create accounts if under 18.</p>
                      <p><strong>2.9 Spam:</strong> send unsolicited advertising, repetitive messages, or bulk communications.</p>
                      <p><strong>2.10 Security abuse:</strong> upload malware, attempt unauthorised access, probe or disrupt systems, or bypass safety measures.</p>
                      <p><strong>2.11 IP infringement:</strong> violate intellectual property or other rights.</p>
                      <p><strong>2.12 Circumvention:</strong> evade enforcement actions (e.g., creating new accounts after suspension) without our permission.</p>
                      <p><strong>2.13 Create fraudulent profiles:</strong> create an account or provide information with the primary intent to mislead, deceive, or impersonate another person for emotional manipulation, financial gain, or other harmful purposes.</p>
                    </div>
                  </div>

                  {/* AUP Section 3 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">3. Enforcement</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p><strong>3.1</strong> We may remove content, limit features, suspend, or terminate accounts for AUP breaches, consistent with the Terms and our moderation processes.</p>
                      <p><strong>3.2</strong> Where appropriate, we may report suspected illegal activity to relevant authorities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-20 bg-muted text-center">
        <Link to="/">
          <Button variant="magnetic" size="lg">
            Back to Home
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default TermsPage;