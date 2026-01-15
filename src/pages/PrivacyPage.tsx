import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-2">PRIVACY POLICY</h2>
              <h3 className="text-2xl font-semibold text-foreground mb-4">OPPOSIA LTD</h3>
              <p className="text-muted-foreground">Last Updated: 14/01/2026</p>
            </div>
            
            <div className="space-y-8">
              {/* Section 1 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">1. Who We Are (Controller)</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>Opposia Ltd will be referred to as ("Opposia", "we", "us", "our") during this Privacy Policy and throughout our terms of service. Opposia is a private limited company registered in England & Wales (Company No. 16955158), with registered office at 167–169 Great Portland Street, 5th Floor, London, W1W 5PF, United Kingdom. We operate the Opposia website, apps, and related services (the "Service").</p>
                  <p>For the purposes of the UK General Data Protection Regulation ("UK GDPR") and the Data Protection Act 2018 ("DPA 2018"), Opposia Ltd is the data controller.</p>
                  <p><strong>Privacy contact:</strong> <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a></p>
                  <p className="text-sm italic">(Write "Privacy Request" in the subject line.)</p>
                  <p><strong>Data Protection Officer (DPO):</strong> We have not appointed a DPO at this time. If this changes, we will update this policy.</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">2. Scope of This Policy</h3>
                <p className="text-muted-foreground mb-3">This policy explains how we collect, use, share, and protect personal data when you:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>create and manage an account;</li>
                  <li>use matching, profile and messaging features;</li>
                  <li>report users/content or contact support/safety; and/or</li>
                  <li>use our website and apps (including technical logs and security).</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">3. The Service and Eligibility</h3>
                <p className="text-muted-foreground">
                  Opposia is intended for consenting adults aged 18+. We do not knowingly allow people under 18 to use the Service (see Section 17).
                </p>
              </div>

              {/* Section 4 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">4. Key Definitions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Personal data:</strong> information relating to an identified or identifiable person.</li>
                  <li><strong>Special category data:</strong> includes data revealing sexual orientation.</li>
                  <li><strong>Criminal offence data:</strong> data about criminal convictions/offences or related allegations handled under applicable safeguards (DPA 2018).</li>
                  <li><strong>Processor:</strong> a third party processing personal data on our behalf under contract.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">5. Personal Data We Collect</h3>
                
                <h4 className="font-semibold text-foreground mt-4 mb-2">5.1 Data you provide (Account & Profile)</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Email address, login credentials, and date of birth (for age assurance).</li>
                  <li>Gender, relationship preferences, and matching preferences.</li>
                  <li>Sexual orientation (special category data) only if you choose to provide it.</li>
                  <li>General location (e.g., city/region), profile photos, and profile bio.</li>
                  <li>Subscription/payment metadata (we do not store full card details; these are handled by our payment provider).</li>
                </ul>

                <h4 className="font-semibold text-foreground mt-4 mb-2">5.2 Data collected automatically (Technical & Usage)</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>IP address, device type, browser/app version, OS, time/date stamps, pages/screens viewed, crash logs, and approximate location derived from IP.</li>
                  <li>Cookie/local storage identifiers (where used) and analytics events depending on your settings/consent (see Section 14).</li>
                </ul>

                <h4 className="font-semibold text-foreground mt-4 mb-2">5.3 Data generated through use of the Service</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Likes, matches, blocks, messages, reports, safety tickets, and communications with us.</li>
                  <li>Evidence you submit voluntarily (e.g., screenshots) for reports, complaints, disputes, or legal claims.</li>
                </ul>

                <h4 className="font-semibold text-foreground mt-4 mb-2">5.4 Data about other people you provide</h4>
                <p className="text-muted-foreground mb-4">
                  If you share information about another person (e.g., in a report), you must have the right to share it. We use it only to handle the issue you raised (e.g., safety enforcement, dispute handling).
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">5.5 Data we do not intend to collect</h4>
                <p className="text-muted-foreground">
                  We do not ask for health data, political opinions, religion, or identity documents as a standard requirement. If you voluntarily include such information in messages/bios/reports, we may process it only where necessary for safety, compliance, or legal claims and apply additional safeguards.
                </p>
              </div>

              {/* Section 6 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">6. Information You Share With Other Users</h3>
                
                <h4 className="font-semibold text-foreground mt-4 mb-2">6.1 Profile visibility</h4>
                <p className="text-muted-foreground mb-4">
                  Other users may see your profile information (e.g., photos, bio, approximate location, preferences) as part of Service functionality, subject to your settings (where available).
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">6.2 Messaging</h4>
                <p className="text-muted-foreground mb-4">
                  Messages are delivered to recipients you choose. Others may copy/screenshot information you share, and we cannot fully control what happens outside our platform.
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">6.3 Controls</h4>
                <p className="text-muted-foreground">
                  You can edit your profile, change settings (where available), block users, and report content.
                </p>
              </div>

              {/* Section 7 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">7. How We Use Your Data (Purposes & Legal Bases)</h3>
                <p className="text-muted-foreground mb-4">We process personal data only where we have a lawful basis under UK GDPR.</p>
                
                <h4 className="font-semibold text-foreground mt-4 mb-3">7.1 Purposes, data categories, and lawful bases</h4>
                
                <div className="space-y-4 text-muted-foreground text-sm">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">A. Provide and operate the Service (account, matching, messaging)</p>
                    <p><strong>Data:</strong> Account & Profile; Usage; Messages</p>
                    <p><strong>Lawful basis:</strong> Contract (UK GDPR Art 6(1)(b))</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">B. Match suggestions and ranking (profiling)</p>
                    <p><strong>Data:</strong> Preferences, approximate location, usage signals</p>
                    <p><strong>Lawful basis:</strong> Contract (Art 6(1)(b)) and/or Legitimate interests (Art 6(1)(f)) (running and improving the Service)</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">C. Process sexual orientation for matchmaking (if provided)</p>
                    <p><strong>Data:</strong> Sexual orientation</p>
                    <p><strong>Lawful basis:</strong> Consent (Art 6(1)(a))</p>
                    <p><strong>Special category condition:</strong> Explicit consent (Art 9(2)(a))</p>
                    <p className="italic">You can withdraw consent at any time (Section 16).</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">D. Trust & safety: moderation, investigations, dispute handling, enforcement</p>
                    <p><strong>Data:</strong> Profiles, messages, reports, evidence, device/IP signals</p>
                    <p><strong>Lawful basis:</strong> Legitimate interests (Art 6(1)(f)) (keep users safe, prevent abuse/fraud) and/or Legal claims</p>
                    <p><strong>Special category/criminal-related info:</strong> processed where necessary for establishment/exercise/defence of legal claims or substantial public interest/safeguarding as applicable, with DPA 2018 safeguards.</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">E. Security and fraud prevention</p>
                    <p><strong>Data:</strong> Technical logs, IP, device info, account signals</p>
                    <p><strong>Lawful basis:</strong> Legitimate interests (Art 6(1)(f))</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">F. Service communications (important notices, security alerts, updates)</p>
                    <p><strong>Data:</strong> Contact details</p>
                    <p><strong>Lawful basis:</strong> Contract (Art 6(1)(b)) and/or Legitimate interests (Art 6(1)(f))</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">G. Marketing (where permitted)</p>
                    <p><strong>Data:</strong> Contact details, preferences</p>
                    <p><strong>Lawful basis:</strong> Consent (Art 6(1)(a)) where required under PECR, or Legitimate interests (Art 6(1)(f)) where lawful</p>
                    <p className="italic">You can opt out at any time.</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="font-semibold text-foreground mb-2">H. Legal & regulatory compliance</p>
                    <p><strong>Data:</strong> as required</p>
                    <p><strong>Lawful basis:</strong> Legal obligation (Art 6(1)(c))</p>
                  </div>
                </div>

                <h4 className="font-semibold text-foreground mt-6 mb-2">7.2 Marketing and PECR</h4>
                <p className="text-muted-foreground">
                  We send marketing only where permitted by PECR and data protection law. You can opt out via unsubscribe links or by contacting <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>.
                </p>
              </div>

              {/* Section 8 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">8. Special Category Data and Criminal Offence / Allegation Information</h3>
                
                <h4 className="font-semibold text-foreground mt-4 mb-2">8.1 Sexual orientation</h4>
                <p className="text-muted-foreground mb-4">
                  We process sexual orientation for matchmaking only if you provide it, and only with your explicit consent. You may withdraw consent at any time.
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">8.2 Other special category data you may choose to share</h4>
                <p className="text-muted-foreground mb-4">
                  If you voluntarily provide other special category data (e.g., in messages/reports), we process it only where necessary for trust & safety, dispute handling, or legal claims, using additional safeguards.
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">8.3 Criminal offence and allegation information (narrow, safety-focused)</h4>
                <p className="text-muted-foreground mb-2">
                  Opposia does not conduct routine background checks. However, reports/evidence may include allegations of criminal behaviour (e.g., threats, harassment). Where this occurs, we process that information only to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>investigate and enforce our Terms,</li>
                  <li>protect users,</li>
                  <li>prevent misuse, and</li>
                  <li>establish/exercise/defend legal claims,</li>
                </ul>
                <p className="text-muted-foreground mt-2">with safeguards required by the DPA 2018.</p>
              </div>

              {/* Section 9 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">9. Automated Processing & Profiling</h3>
                <p className="text-muted-foreground mb-3">
                  We use automated processing to suggest matches (e.g., preferences and approximate location). This does not produce legal or similarly significant effects for you.
                </p>
                <p className="text-muted-foreground">
                  We do not make final suspension/termination decisions solely by automated means; we use human review. You may appeal by contacting <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>.
                </p>
              </div>

              {/* Section 10 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">10. Who We Share Data With</h3>
                <p className="text-muted-foreground mb-3">We may share data with:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Other users</strong> (as part of the Service, see Section 6).</li>
                  <li><strong>Processors</strong> providing hosting, authentication, databases, customer support tooling, analytics (where enabled), security services, email delivery, and professional advisers, under contract.</li>
                  <li><strong>Payment providers</strong> (to process payments; we do not store full card details).</li>
                  <li><strong>Authorities/third parties</strong> where required by law or necessary to protect rights, safety, or prevent wrongdoing.</li>
                  <li><strong>Corporate transactions</strong> (buyer/successor) in a merger/acquisition/reorganisation/sale, with safeguards.</li>
                </ul>
                <p className="text-muted-foreground mt-3 font-semibold">
                  We do not sell your personal data for third-party marketing.
                </p>
              </div>

              {/* Section 11 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">11. International Transfers</h3>
                <p className="text-muted-foreground">
                  If personal data is transferred outside the UK, we use UK adequacy regulations or UK-approved transfer mechanisms (e.g., IDTA/addendum) and apply transfer risk assessments/supplementary measures where required.
                </p>
              </div>

              {/* Section 12 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">12. Data Security</h3>
                <p className="text-muted-foreground">
                  We use technical and organisational measures designed to protect personal data (e.g., encryption where appropriate, access controls, monitoring, security testing). No system is 100% secure; keep your login credentials confidential.
                </p>
              </div>

              {/* Section 13 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">13. Data Retention</h3>
                <p className="text-muted-foreground mb-4">
                  We retain data only as long as needed for the purposes above and legal requirements.
                </p>
                
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Active account data:</strong> while your account is active.</li>
                  <li><strong>Inactive accounts:</strong> deleted/anonymised after 24 months inactivity (where feasible we will warn you before deletion).</li>
                  <li><strong>Deletion requests:</strong> deleted/anonymised within 30 days of a verified request, subject to legal/compliance holds.</li>
                  <li><strong>Backups:</strong> may persist up to 90 days (restricted access, not used for routine operations).</li>
                  <li><strong>Sexual orientation:</strong> if you withdraw consent, we stop using it for matchmaking and suppress it in active matching systems within 48 hours (backup rollover applies).</li>
                  <li><strong>Safety/moderation reports & evidence:</strong> 3 years from closure (longer if needed for serious safety issues or legal claims).</li>
                  <li><strong>Technical logs (e.g., IP):</strong> 90 days, unless needed longer for investigating abuse/security incidents.</li>
                  <li><strong>Financial/accounting records:</strong> 7 years (tax/accounting).</li>
                  <li><strong>Legal holds:</strong> as required.</li>
                </ul>
              </div>

              {/* Section 14 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">14. Cookies and Similar Technologies</h3>
                <p className="text-muted-foreground">
                  We use cookies/local storage only where needed for functionality and security, and (where enabled) for analytics. Non-essential technologies are used only with your consent. See our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
              </div>

              {/* Section 15 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">15. Your Rights</h3>
                <p className="text-muted-foreground mb-3">
                  You have rights to: access, rectification, erasure, restriction, objection, data portability (where applicable), and to withdraw consent at any time (where processing is based on consent). We will respond within one month, subject to lawful extensions for complex requests.
                </p>
                <p className="text-muted-foreground">
                  <strong>How to exercise rights:</strong> email <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> (subject: "Privacy Request"). We may request verification.
                </p>
              </div>

              {/* Section 16 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">16. Withdrawing Consent</h3>
                <p className="text-muted-foreground">
                  Where we rely on consent (e.g., sexual orientation; analytics where consent-gated), you can withdraw consent at any time via settings (where available) or by contacting <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>. Withdrawal does not affect processing carried out before withdrawal.
                </p>
              </div>

              {/* Section 17 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">17. Children (Under 18)</h3>
                <p className="text-muted-foreground">
                  The Service is for adults 18+. If you believe a minor is using the Service, contact <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>.
                </p>
              </div>

              {/* Section 18 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">18. Complaints</h3>
                <p className="text-muted-foreground">
                  Contact us first at <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> (subject: "Privacy Complaint"). You also have the right to complain to the UK supervisory authority, the Information Commissioner's Office (ICO).
                </p>
              </div>

              {/* Section 19 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">19. Changes</h3>
                <p className="text-muted-foreground">
                  We may update this policy. If changes are material, we will notify you via email and/or in-Service notice and update the "Last Updated" date.
                </p>
              </div>

              {/* Section 20 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">20. Contact</h3>
                <div className="text-muted-foreground space-y-1">
                  <p><strong>Opposia Ltd</strong></p>
                  <p>167–169 Great Portland Street, 5th Floor, London, W1W 5PF</p>
                  <p>Support & Privacy: <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a></p>
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

export default PrivacyPage;