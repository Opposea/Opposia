import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

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
              <p className="text-muted-foreground">Effective Date: 19/01/2026</p>
              <p className="text-muted-foreground">Company: Opposia Ltd (Registered in England & Wales, Company No. 16955158)</p>
              <p className="text-muted-foreground">Registered Office: 167–169 Great Portland Street, 5th Floor, London, W1W 5PF, United Kingdom</p>
              <p className="text-muted-foreground">Contact: <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a></p>
            </div>

            <div className="bg-card p-6 rounded-lg border mb-8">
              <p className="text-muted-foreground">
                These Terms of Service ("Terms") govern your access to and use of the Opposia website, apps, and related services (the "Services"). In these Terms, "Opposia", "we", "us", "our" means Opposia Ltd. "You" means the person using the Services.
              </p>
              <p className="text-muted-foreground mt-4">
                By creating an account, purchasing a subscription, or otherwise using the Services, you agree to these Terms. If you do not agree, do not use the Services.
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Section 1 - Eligibility */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">1. Eligibility</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>1.1 Age (no minors).</strong> You must be 18 years of age or older to create an account or use the Services. We do not permit anyone under 18 to use the Services.</p>
                  <p><strong>1.2 Personal use only (no businesses/organisations).</strong> The Services are for personal, non-commercial use by individuals. You must not use the Services on behalf of, or for the benefit of, any business, agency, organisation, political campaign, or other entity, and you must not create an account for anyone other than yourself.</p>
                  <p><strong>1.3 Legal capacity.</strong> By using the Services, you represent and warrant that you are legally capable of entering into a binding contract with us and that you are not restricted from doing so under applicable laws.</p>
                  <p><strong>1.4 No sex offenders / serious offenders / prohibited persons.</strong> You represent and warrant that:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>you are not required to register on any sex offender register (or equivalent) in any jurisdiction;</li>
                    <li>you have not been convicted of (and have not pled guilty/no contest to) any offence involving sexual misconduct, violence, abuse, exploitation, harassment, stalking, trafficking, child sexual offences, terrorism, or credible threats of violence; and</li>
                    <li>you are not otherwise prohibited by law, court order, or probation/parole conditions from using services of this nature or from contacting others through the Services.</li>
                  </ul>
                  <p><strong>1.5 Reasonable judgment and safe use.</strong> You represent and warrant that you are able to exercise reasonable judgment and take appropriate precautions when interacting with others online and in person. You agree to follow our safety guidance and act responsibly.</p>
                  <p><strong>1.6 One account; no prior bans.</strong> You must not have more than one account at any time. If we have previously suspended or terminated your account (or access to any of our services), you may not create another account without our express written permission.</p>
                  <p><strong>1.7 Ongoing condition.</strong> Eligibility is an ongoing requirement. If you cease to meet any eligibility requirement, your authorisation to use the Services ends automatically and you must stop using the Services and delete your account. We may suspend or terminate access immediately and without notice where we consider it necessary for safety, compliance, or to protect users.</p>
                  <p><strong>1.8 Verification and enforcement.</strong> We do not routinely conduct identity or criminal background checks. However, to protect users and the integrity of the Services, we may (where lawful) request additional information, require verification steps, restrict features, or suspend/terminate accounts if we reasonably believe you are ineligible or have provided false information.</p>
                </div>
              </div>

              {/* Section 2 - Account Registration and Security */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">2. Account Registration and Security</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>2.1 Registration.</strong> To use the Services you must create an account and provide accurate, up-to-date information.</p>
                  <p><strong>2.2 Credentials.</strong> You are responsible for maintaining the confidentiality of your login credentials.</p>
                  <p><strong>2.3 Responsibility.</strong> You are responsible for anything that happens through your account.</p>
                  <p><strong>2.4 Unauthorised use.</strong> Notify us immediately at <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> if you suspect unauthorised access.</p>
                </div>
              </div>

              {/* Section 3 - Who we are */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">3. Who we are</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>3.1</strong> Opposia does not have any human input in the matchmaking algorithm, it does not guarantee any matches, advise any matches or make any human judgment when pairing user. The match making algorithm is provided to users for entertainment purposes and shouldn't be used to take real world risks.</p>
                  <p><strong>3.2</strong> The algorithm is based on users answers to the questionnaire and mistakes could be made by this algorithm.</p>
                </div>
              </div>

              {/* Section 4 - User Responsibility, Offline Interactions, and Risk */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">4. User Responsibility, Offline Interactions, and Risk</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>4.1 Your responsibility.</strong> Users are responsible for exercising reasonable judgment and caution when interacting with others, including before:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>meeting in person;</li>
                    <li>sharing personal information;</li>
                    <li>sending money or financial details.</li>
                  </ul>
                  <p><strong>4.2 Off-platform risk.</strong> Users are solely responsible for interactions on and off the Services. If you choose to communicate off-platform or meet in person, you do so at your own risk.</p>
                  <p><strong>4.3 No guarantee of user behaviour.</strong> Opposia does not guarantee the identity, intentions, or conduct of any user. Interactions occur at your discretion and risk.</p>
                  <p><strong>4.4 Safety guidance.</strong> We strongly encourage you to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>meet in public places;</li>
                    <li>inform friends or family of plans;</li>
                    <li>avoid sharing sensitive personal or financial information.</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 - Reporting and Moderation */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">5. Reporting and Moderation</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>5.1 Reporting.</strong> Users may report inappropriate, abusive, or unsafe behaviour to <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>, providing evidence where possible (e.g., screenshots or message logs).</p>
                  <p><strong>5.2 Evidence.</strong> We may be unable to act where evidence is insufficient.</p>
                  <p><strong>5.3 Discretion.</strong> We reserve the right to investigate reports and take action at our discretion, including warnings, suspension, restriction, or removal of accounts.</p>
                  <p><strong>5.4 No obligation.</strong> We are not obliged to take any particular action, and we may limit information shared about enforcement for safety, privacy, or legal reasons.</p>
                </div>
              </div>

              {/* Section 6 - Acceptable Use and Prohibited Behaviour */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">6. Acceptable Use and Prohibited Behaviour</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>6.1 Personal use only.</strong> The Services are for personal use. You must not use the Services:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>on behalf of any business/organisation;</li>
                    <li>to advertise, promote, recruit, or solicit commercially; or</li>
                    <li>as an agent/manager/intermediary for another person.</li>
                  </ul>
                  <p><strong>6.2 You agree you will:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>comply with these Terms and all applicable laws (including privacy, data protection, and IP laws);</li>
                    <li>use the latest version of the app (where reasonably available);</li>
                    <li>take reasonable steps to protect your account and other users' safety.</li>
                  </ul>
                  <p><strong>6.3 You must not:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>impersonate anyone or misrepresent identity, age, or affiliations;</li>
                    <li>harass, bully, stalk, threaten, defame, intimidate, or abuse anyone;</li>
                    <li>share or request personal data for unlawful/commercial purposes (including passwords, payment details, or identity documents);</li>
                    <li>solicit money, gifts, loans, "investments", crypto, or anything of value (including romance scams);</li>
                    <li>use the Services for illegal, harmful, exploitative, or fraudulent purposes;</li>
                    <li>spam or send unsolicited promotions;</li>
                    <li>disrupt, damage, or interfere with the Services, systems, or networks;</li>
                    <li>scrape, data-mine, crawl, reverse engineer, decompile, or attempt to extract non-public data/source code (except where the law permits and to the extent it cannot be restricted);</li>
                    <li>introduce malware or bypass security/access controls;</li>
                    <li>create accounts to evade enforcement action.</li>
                  </ul>
                  <p><strong>6.4 Third-party tools / automation.</strong> You must not use bots, automation, scrapers, or third-party tools that interact with the Services without our written permission.</p>
                  <p><strong>6.5 Enforcement.</strong> Breaching this section may result in warnings, restrictions, suspension, termination, device/account bans, and/or reporting to law enforcement where appropriate.</p>
                </div>
              </div>

              {/* Section 7 - Prohibited Content */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">7. Prohibited Content</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>You must not upload, post, message, or share content that:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>is hateful, discriminatory, or incites hatred or violence;</li>
                    <li>is threatening, harassing, abusive, or likely to cause distress;</li>
                    <li>is obscene, pornographic, or contains nudity where not permitted by the Services;</li>
                    <li>depicts or sexualises minors (zero tolerance);</li>
                    <li>promotes self-harm, eating disorders, dangerous challenges, or violent extremism;</li>
                    <li>facilitates illegal activity (including terrorism or exploitation);</li>
                    <li>infringes intellectual property, privacy, or other rights;</li>
                    <li>contains malware, spyware, or harmful code;</li>
                    <li>is commercial solicitation, sex work advertising, or "sugar" arrangements;</li>
                    <li>is misleading in a way likely to cause harm (e.g., scams, fraud scripts).</li>
                  </ul>
                  <p className="mt-4">Breaching this section may lead to immediate removal and enforcement action under Section 6.5.</p>
                </div>
              </div>

              {/* Section 8 - Content and Intellectual Property */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">8. Content and Intellectual Property</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>8.1 Your content.</strong> Users retain ownership of the content they post ("Your Content").</p>
                  <p><strong>8.2 Licence to Opposia.</strong> You grant Opposia a non-exclusive, worldwide, royalty-free licence to host, display, reproduce, and use Your Content for operating, improving, and enforcing the Services.</p>
                  <p><strong>8.3 Our content.</strong> The Services and all associated software, branding, and IP (excluding user content) are owned by or licensed to Opposia. You may not copy, modify, distribute, or create derivative works from our content without written permission.</p>
                </div>
              </div>

              {/* Section 9 - Special Category Data */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">9. Special Category Data</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>9.1 Special category data.</strong> The platform may collect special category data, including sexual orientation.</p>
                  <p><strong>9.2 Consent.</strong> You provide this data voluntarily and it is processed only with your explicit consent (as required by data protection law).</p>
                  <p><strong>9.3 Use limitation.</strong> We use this data only to operate the platform, enable matching, moderation, and user support, as described in our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
                </div>
              </div>

              {/* Section 10 - Disclaimer ("As Is") */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">10. Disclaimer ("As Is")</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>10.1</strong> To the fullest extent permitted by law, the Services are provided "as is" and "as available".</p>
                  <p><strong>10.2</strong> We do not guarantee:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>uninterrupted or error-free service;</li>
                    <li>that matches are compatible or successful;</li>
                    <li>the number of active users;</li>
                    <li>the accuracy or completeness of user content;</li>
                    <li>that interactions will be safe or lawful.</li>
                  </ul>
                  <p><strong>10.3</strong> You are responsible for verifying information and using judgment.</p>
                </div>
              </div>

              {/* Section 11 - Limitation of Liability */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">11. Limitation of Liability (UK/EU compliant)</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>11.1 Non-excludable liability.</strong> Nothing in these Terms excludes or limits liability for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>death or personal injury caused by negligence;</li>
                    <li>fraud or fraudulent misrepresentation; or</li>
                    <li>any liability that cannot be excluded under applicable law (including mandatory consumer rights).</li>
                  </ul>
                  <p><strong>11.2 Excluded losses (to the extent permitted).</strong> Subject to 11.1, Opposia is not liable for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>indirect, consequential, special, or punitive losses;</li>
                    <li>loss of profits, revenue, goodwill, data, or business opportunity;</li>
                    <li>losses arising from user conduct or offline interactions;</li>
                    <li>losses arising from content posted by users or third parties.</li>
                  </ul>
                  <p><strong>11.3 Liability cap (to the extent permitted).</strong> Subject to 11.1, our total liability to you for all claims relating to the Services is limited to the greater of:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>100% amounts you paid us for the Services in the 12 months before the event giving rise to the claim.</li>
                  </ul>
                  <p><strong>11.4 User-to-user risk.</strong> You acknowledge that Opposia is not responsible for user conduct and you use the Services at your own risk.</p>
                </div>
              </div>

              {/* Section 12 - Indemnity */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">12. Indemnity (You Protect Us)</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>12.1</strong> To the extent permitted by law, you agree to indemnify and hold harmless Opposia, its directors, officers, employees, and contractors from claims, losses, liabilities, and expenses (including reasonable legal fees) arising out of:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>your breach of these Terms;</li>
                    <li>your unlawful conduct;</li>
                    <li>Your Content; or</li>
                    <li>your interactions with other users.</li>
                  </ul>
                </div>
              </div>

              {/* Section 13 - Termination and Enforcement */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">13. Termination and Enforcement</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>13.1 Closing your account.</strong> You can close your account at any time via account settings (or by contacting support if settings are unavailable).</p>
                  <p><strong>13.2 Our rights.</strong> We may suspend, restrict, or terminate your account at any time, with or without notice, if we believe you:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>breached these Terms;</li>
                    <li>pose a safety, fraud, or legal risk;</li>
                    <li>misuse the Services; or</li>
                    <li>must be restricted/removed to comply with law or regulator guidance.</li>
                  </ul>
                  <p><strong>13.3 Effect of termination.</strong> Upon termination:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>your licence to use the Services ends;</li>
                    <li>we may remove or limit access to Your Content (subject to law and our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>);</li>
                    <li>sections intended to survive termination will continue (including liability limits, indemnities).</li>
                  </ul>
                </div>
              </div>

              {/* Section 14 - Privacy, Cookies, and Data Protection */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">14. Privacy, Cookies, and Data Protection</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>14.1 Privacy Policy.</strong> Our processing of personal data is explained in our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
                  <p><strong>14.2 Cookie Policy.</strong> Our use of cookies and similar technologies is explained in our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</p>
                  <p><strong>14.3 Controller.</strong> Opposia Ltd is the data controller for most processing under the Services, unless stated otherwise.</p>
                  <p><strong>14.4 UK & EU GDPR alignment.</strong> UK data protection is governed by the UK GDPR and the Data Protection Act 2018. If you offer the Services to EU/EEA users, EU GDPR may also apply in relation to those users.</p>
                </div>
              </div>

              {/* Section 15 - Copyright, Trademark, and Complaints */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">15. Copyright, Trademark, and Complaints</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>15.1</strong> If you believe content on the Services infringes your copyright or trademark, email <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> with:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>your name and contact details;</li>
                    <li>identification of the work allegedly infringed;</li>
                    <li>the location of the content (screenshots/links);</li>
                    <li>a statement you believe the use is not authorised; and</li>
                    <li>a statement the information is accurate.</li>
                  </ul>
                  <p><strong>15.2</strong> We may remove content and/or suspend repeat infringers where appropriate.</p>
                </div>
              </div>

              {/* Section 16 - Third-Party Services and Links */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">16. Third-Party Services and Links</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>16.1</strong> The Services may contain links to third-party sites or services. We do not control them and are not responsible for them.</p>
                  <p><strong>16.2</strong> Your dealings with third parties are between you and them.</p>
                </div>
              </div>

              {/* Section 17 - Changes to These Terms */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">17. Changes to These Terms</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>17.1</strong> We may update these Terms from time to time.</p>
                  <p><strong>17.2</strong> If we make material changes, we will provide notice via the Services and/or email where required.</p>
                  <p><strong>17.3</strong> Continued use after changes take effect means you accept the updated Terms.</p>
                </div>
              </div>

              {/* Section 18 - Governing Law and Jurisdiction */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">18. Governing Law and Jurisdiction</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>18.1</strong> These Terms are governed by the laws of England and Wales.</p>
                  <p><strong>18.2</strong> Courts of England and Wales will have jurisdiction, except that if you are a consumer living in another country, you may also have the right to bring proceedings in your home courts and rely on mandatory consumer protections there (where applicable).</p>
                </div>
              </div>

              {/* Section 19 - General Legal Terms */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">19. General Legal Terms</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>19.1 Severability.</strong> If any part of these Terms is unlawful or unenforceable, the rest remains in effect.</p>
                  <p><strong>19.2 No waiver.</strong> If we don't enforce a provision, that doesn't waive our right to enforce it later.</p>
                  <p><strong>19.3 Assignment.</strong> We may assign or transfer these Terms as part of a merger, acquisition, reorganisation, or sale of assets. You may not assign your rights without our written consent.</p>
                  <p><strong>19.4 Entire agreement.</strong> These Terms, together with the <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>, and any purchase terms presented at checkout, form the entire agreement between you and Opposia regarding the Services.</p>
                </div>
              </div>

              {/* Section 20 - Contact */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">20. Contact</h3>
                <div className="text-muted-foreground">
                  <p>Questions, complaints, or notices: <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a></p>
                </div>
              </div>

              {/* Refund Policy Section */}
              <div className="mt-16 pt-8 border-t">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">REFUND POLICY</h2>
                  <h3 className="text-xl font-semibold text-foreground mb-4">OPPOSIA LTD</h3>
                  <p className="text-muted-foreground">Version: 1.0 | Last Updated: 19/01/2026</p>
                </div>

                <div className="space-y-8">
                  {/* Refund Section 1 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">1. Overview</h3>
                    <p className="text-muted-foreground">
                      Opposia Ltd offers paid subscriptions that provide access to premium features for a set period. Unless required by law, fees are non-refundable because you pay for time-limited access to features, not for any specific outcome (such as finding a match).
                    </p>
                  </div>

                  {/* Refund Section 2 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">2. Subscriptions, Renewals, and Cancellation (Email Only)</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p><strong>2.1 Auto-renewal.</strong> Subscriptions renew automatically at the end of each billing cycle (e.g., monthly or annual) unless you cancel before the renewal date.</p>
                      <p><strong>2.2 How to cancel (email only).</strong> To cancel auto-renewal, you must email <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> from the email address linked to your account and clearly state that you wish to cancel your subscription. We may request information to verify your account.</p>
                      <p><strong>2.3 Cancellation timing.</strong> To avoid being charged for the next billing cycle, we must receive your cancellation email at least 48 hours before your renewal date/time (or such other timeframe stated at checkout). If you cancel after that point, your next renewal charge may still be processed.</p>
                      <p><strong>2.4 Access after cancellation.</strong> If you cancel, your subscription benefits remain available until the end of the then-current paid period, after which your account will revert to free features (if available).</p>
                      <p><strong>2.5 Confirmation.</strong> We will email a cancellation confirmation once processed. If you do not receive confirmation, please contact us again.</p>
                    </div>
                  </div>

                  {/* Refund Section 3 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">3. UK/EU 14-Day Cancellation Right (Consumers)</h3>
                    <p className="text-muted-foreground mb-4">
                      If you are a consumer in the UK or EU/EEA and you purchase a subscription online, you may have a legal right to cancel within 14 days from the day after purchase (the "cooling-off period"), subject to rules for digital services.
                    </p>
                    <div className="space-y-3 text-muted-foreground">
                      <p><strong>3.1 Starting the service immediately.</strong> If you request immediate access to premium features during the 14-day period, you agree that we can start supplying the service right away. If you then cancel within the 14-day period, you may be required to pay a proportionate amount for the service supplied up to cancellation, where allowed by law.</p>
                      <p><strong>3.2 Digital content / immediate performance.</strong> Where the law allows the cooling-off right to be waived for certain digital content or immediate supply, we will only rely on that waiver where we have obtained your express consent and acknowledgement at checkout in the required form.</p>
                    </div>
                  </div>

                  {/* Refund Section 4 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">4. Discretionary Refunds (Exceptional Circumstances)</h3>
                    <p className="text-muted-foreground mb-4">In addition to any legal rights you may have, we may (at our sole discretion) consider refunds in limited cases such as:</p>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="pl-4 border-l-2 border-primary/30">
                        <p><strong>4.1 Verified technical failure.</strong> A significant, verified technical issue that prevented reasonable use of core paid features for a substantial part of your paid period, and which we could not resolve within a reasonable time.</p>
                      </div>
                      <div className="pl-4 border-l-2 border-primary/30">
                        <p><strong>4.2 Duplicate or erroneous charge.</strong> You were charged more than once for the same subscription period, or charged in error.</p>
                      </div>
                      <div className="pl-4 border-l-2 border-primary/30">
                        <p><strong>4.3 Unauthorised payment.</strong> If you believe a payment was unauthorised, contact your bank/payment provider immediately and notify us. We may request evidence and may suspend the account to protect you and the platform.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-4">
                      Discretionary refunds are not guaranteed. We do not refund for dissatisfaction with outcomes (e.g., not finding a match), user behaviour, or where you forgot to cancel.
                    </p>
                  </div>

                  {/* Refund Section 5 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">5. How to Request a Refund</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p><strong>5.1 Time limit.</strong> To request a discretionary refund under Section 4, email <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> within 14 days of the charge.</p>
                      <p><strong>5.2 Information required.</strong> Provide:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>the email/username linked to your account;</li>
                        <li>the date and amount of the charge;</li>
                        <li>the subscription type (monthly/annual);</li>
                        <li>a clear explanation and any supporting evidence (screenshots, error details, etc.).</li>
                      </ul>
                      <p><strong>5.3 Decision timeframe.</strong> We aim to respond within 14 business days. If approved, refunds are issued to the original payment method and may take 5–10 business days to appear, depending on your payment provider.</p>
                    </div>
                  </div>

                  {/* Refund Section 6 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">6. Chargebacks</h3>
                    <p className="text-muted-foreground">
                      If you initiate a chargeback without a valid basis, we may suspend or terminate your account and recover reasonable administrative costs where permitted by law. Chargebacks do not remove your obligation to pay valid charges.
                    </p>
                  </div>

                  {/* Refund Section 7 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">7. Your Statutory Rights</h3>
                    <p className="text-muted-foreground">
                      Nothing in this Refund Policy limits your rights under applicable consumer law. In the UK, this includes rights where services are not provided with reasonable care and skill, are not as described, or where other statutory remedies apply.
                    </p>
                  </div>

                  {/* Refund Section 8 */}
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold text-foreground mb-4">8. Changes to This Policy</h3>
                    <p className="text-muted-foreground">
                      We may update this Refund Policy from time to time. Material changes will be communicated via the platform and/or email. The "Last Updated" date will be revised. You can always find the current version at{' '}
                      <Link to="/refund-policy" className="text-primary hover:underline">opposia.com/refund-policy</Link>.
                    </p>
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

      <Footer />
    </div>
  );
};

export default TermsPage;
