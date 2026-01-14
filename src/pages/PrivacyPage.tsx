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
                  <p>Opposia Ltd ("Opposia", "we", "us", "our") is a company registered in England and Wales with its registered office at 167–169 Great Portland Street, 5th Floor, London, W1W 5PF. We operate the Opposia website, apps, and related services (the "Service").</p>
                  <p>For the purposes of the UK General Data Protection Regulation ("UK GDPR") and the Data Protection Act 2018 ("DPA 2018"), Opposia Ltd is the data controller.</p>
                  <p><strong>General Contact:</strong> <a href="mailto:admin@opposia.com" className="text-primary hover:underline">admin@opposia.com</a></p>
                  <p><strong>Privacy Complaints:</strong> <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a></p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">2. Scope of This Policy</h3>
                <p className="text-muted-foreground">
                  This policy explains how we collect, use, share, and protect personal data when you create an account, use matching and messaging features, or contact our support and safety teams. It also explains your rights and how to exercise them.
                </p>
              </div>

              {/* Section 3 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">3. The Service and Eligibility</h3>
                <p className="text-muted-foreground">
                  Opposia is an online platform intended to facilitate social and romantic connections between consenting adults aged 18+. We do not knowingly permit anyone under 18 to use the Service (see Section 16).
                </p>
              </div>

              {/* Section 4 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">4. Key Definitions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Personal data:</strong> information relating to an identified or identifiable individual.</li>
                  <li><strong>Special category data:</strong> includes data revealing sexual orientation.</li>
                  <li><strong>Criminal offence data:</strong> data relating to criminal convictions, offences, or allegations.</li>
                  <li><strong>Processor:</strong> a third party that processes personal data on our behalf under contract.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">5. Personal Data We Collect</h3>
                
                <h4 className="font-semibold text-foreground mt-4 mb-2">5.1 Data you provide to us (Account & Profile Data)</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Email address, account credentials, and date of birth (for age verification).</li>
                  <li>Gender and relationship preferences.</li>
                  <li>Sexual orientation (special category data — see Section 8).</li>
                  <li>General location (e.g., city/region), profile photos, and biographical information you choose to provide.</li>
                  <li>Subscription/payment metadata (full payment details are processed by our payment provider).</li>
                </ul>

                <h4 className="font-semibold text-foreground mt-4 mb-2">5.2 Data collected automatically (Technical & Usage Data)</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>IP address, device type, browser/app version, operating system, log data (e.g., date/time, pages/screens viewed, crash logs), and approximate location derived from IP.</li>
                  <li>Cookie/SDK identifiers and analytics events (subject to your cookie/consent choices; see Section 14).</li>
                </ul>

                <h4 className="font-semibold text-foreground mt-4 mb-2">5.3 Data generated through your use of the Service</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Likes, matches, blocks, messages, reports, support tickets, and communications with us.</li>
                  <li>Evidence you submit voluntarily (e.g., screenshots) in connection with reports or disputes.</li>
                </ul>

                <h4 className="font-semibold text-foreground mt-4 mb-2">5.4 Data about other people you provide</h4>
                <p className="text-muted-foreground">
                  If you share information about other people (e.g., in a report), you must ensure you have the right to share it. We use this only to handle the specific issue you raised (e.g., a safety report).
                </p>
              </div>

              {/* Section 6 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">6. Information You Share With Other Users</h3>
                
                <h4 className="font-semibold text-foreground mt-4 mb-2">6.1 Profile visibility</h4>
                <p className="text-muted-foreground mb-4">
                  Other users may see your profile information, including photos, bio, age/age range, general location, gender, sexual orientation, relationship preferences, and match status, as part of the Service's functionality (and subject to your settings, where available).
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">6.2 Messaging</h4>
                <p className="text-muted-foreground mb-4">
                  Messages you send are delivered to your chosen recipients. Other users may copy, forward, or screenshot information you share with them, and we cannot fully control what they do with it outside our platform.
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">6.3 Controls</h4>
                <p className="text-muted-foreground">
                  You can control some sharing through account settings, by editing your profile, blocking users, or reporting content.
                </p>
              </div>

              {/* Section 7 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">7. How We Use Your Personal Data (Purposes & Legal Bases)</h3>
                <p className="text-muted-foreground mb-4">We process personal data only where we have a lawful basis under UK GDPR.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-muted-foreground border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold text-foreground">Purpose</th>
                        <th className="text-left p-2 font-semibold text-foreground">Data Used</th>
                        <th className="text-left p-2 font-semibold text-foreground">Lawful Basis (Art 6)</th>
                        <th className="text-left p-2 font-semibold text-foreground">Special Category (Art 9)</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr className="border-b">
                        <td className="p-2">Provide & operate the Service</td>
                        <td className="p-2">Account, Profile, Usage, Messages</td>
                        <td className="p-2">Contract (Art 6(1)(b))</td>
                        <td className="p-2">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Process gender, preferences & location for matchmaking</td>
                        <td className="p-2">Gender, Preferences, Location</td>
                        <td className="p-2">Contract (Art 6(1)(b))</td>
                        <td className="p-2">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Process sexual orientation for matchmaking</td>
                        <td className="p-2">Sexual orientation</td>
                        <td className="p-2">Consent (Art 6(1)(a))</td>
                        <td className="p-2">Explicit consent (Art 9(2)(a))</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Trust & safety, moderation, dispute handling</td>
                        <td className="p-2">Profile, Messages, Reports, Evidence</td>
                        <td className="p-2">Legitimate interests (Art 6(1)(f))</td>
                        <td className="p-2">Legal claims (Art 9(2)(f))</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Security and fraud prevention</td>
                        <td className="p-2">Technical, Logs, Account signals</td>
                        <td className="p-2">Legitimate interests (Art 6(1)(f))</td>
                        <td className="p-2">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Service communications</td>
                        <td className="p-2">Contact Data</td>
                        <td className="p-2">Contract / Legitimate interests</td>
                        <td className="p-2">N/A</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Marketing (in line with PECR)</td>
                        <td className="p-2">Contact Data, Preferences</td>
                        <td className="p-2">Consent or Legitimate interests</td>
                        <td className="p-2">N/A</td>
                      </tr>
                      <tr>
                        <td className="p-2">Legal & regulatory compliance</td>
                        <td className="p-2">As required</td>
                        <td className="p-2">Legal obligation (Art 6(1)(c))</td>
                        <td className="p-2">N/A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold text-foreground mt-6 mb-2">7.1 Marketing and PECR</h4>
                <p className="text-muted-foreground">
                  We send marketing only where permitted under the Privacy and Electronic Communications Regulations (PECR). You can opt out at any time via the unsubscribe link in messages and, where available, your account settings.
                </p>
              </div>

              {/* Section 8 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">8. Special Category Data and Criminal Offence / Allegation Information</h3>
                
                <h4 className="font-semibold text-foreground mt-4 mb-2">8.1 Sexual orientation (special category)</h4>
                <p className="text-muted-foreground mb-4">
                  We process your sexual orientation for matchmaking on the basis of your explicit consent (Art 9(2)(a)) and consent (Art 6(1)(a)), provided during profile creation via a clear affirmative action. You can withdraw consent at any time. If you withdraw consent, we will stop processing sexual orientation for matchmaking and your matching experience may be limited or unavailable.
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">8.2 Other special category data you may choose to share</h4>
                <p className="text-muted-foreground mb-4">
                  We do not ask you to provide other special category data (e.g., health details, political opinions, religious beliefs). If you voluntarily include it (e.g., in your bio, messages, or reports), we may process it only where necessary for trust & safety, moderation, dispute handling, or legal claims, and we apply additional safeguards.
                </p>

                <h4 className="font-semibold text-foreground mt-4 mb-2">8.3 Criminal offence and allegation information (narrow, safety-focused)</h4>
                <p className="text-muted-foreground">
                  Opposia does not carry out criminal background checks. However, reports or evidence you submit may include allegations of criminal conduct (for example threats or harassment). Where this occurs, we process that information only to handle the report, keep users safe, prevent misuse of the Service, and establish, exercise or defend legal claims, with appropriate safeguards under the DPA 2018.
                </p>
              </div>

              {/* Section 9 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">9. Automated Processing & Profiling</h3>
                <p className="text-muted-foreground mb-3">
                  We use automated profiling to suggest matches (for example based on preferences and general location). This does not produce legal or similarly significant effects for you.
                </p>
                <p className="text-muted-foreground">
                  Significant enforcement actions (like account suspension or termination) are not made solely by automated means and involve human review. You may appeal by contacting <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>.
                </p>
              </div>

              {/* Section 10 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">10. Who We Share Personal Data With</h3>
                <p className="text-muted-foreground mb-3">We may share personal data with:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Other users,</strong> as part of the Service design (see Section 6).</li>
                  <li><strong>Trusted service providers (processors)</strong> for hosting, support, analytics (subject to consent where required), security, and professional advice, under appropriate contractual obligations.</li>
                  <li><strong>Authorities or third parties</strong> where required by law or necessary to protect rights, safety, or prevent wrongdoing.</li>
                  <li><strong>A buyer/successor</strong> in the event of a merger, acquisition, reorganisation, or asset sale, subject to appropriate safeguards.</li>
                </ul>
                <p className="text-muted-foreground mt-3 font-semibold">
                  We do not sell your personal data for third-party marketing.
                </p>
              </div>

              {/* Section 11 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">11. International Data Transfers</h3>
                <p className="text-muted-foreground">
                  Where personal data is transferred outside the UK, we ensure protection via UK adequacy regulations or the UK International Data Transfer Agreement (IDTA) (or other UK-approved mechanism). Where required, we also carry out transfer risk assessments and apply supplementary measures.
                </p>
              </div>

              {/* Section 12 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">12. Data Security</h3>
                <p className="text-muted-foreground">
                  We implement technical and organisational measures designed to protect personal data, including (as appropriate) encryption, access controls, monitoring, security testing, and staff training. No system is 100% secure; you must keep your login credentials confidential.
                </p>
              </div>

              {/* Section 13 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">13. Data Retention</h3>
                <p className="text-muted-foreground mb-4">
                  We keep personal data only as long as necessary for the purposes described in this policy and to comply with legal obligations.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-muted-foreground border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold text-foreground">Data Category</th>
                        <th className="text-left p-2 font-semibold text-foreground">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr className="border-b">
                        <td className="p-2">Active account data</td>
                        <td className="p-2">While your account is active.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Inactive accounts</td>
                        <td className="p-2">Deleted/anonymised after 24 months of inactivity (following a warning notice where feasible).</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Account deletion request</td>
                        <td className="p-2">Deleted/anonymised within 30 days of a verified request, subject to legal/compliance holds.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Backups</td>
                        <td className="p-2">May persist for up to 90 days before secure overwrite/deletion (restricted and not used for routine operations).</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Sexual orientation data</td>
                        <td className="p-2">We stop using it for matchmaking upon withdrawal of consent and suppress it from active matching systems within 48 hours (backup rollover applies).</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Safety/moderation reports & evidence</td>
                        <td className="p-2">3 years from case closure (longer if necessary for legal claims or serious safety reasons).</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Technical logs (IP)</td>
                        <td className="p-2">90 days (unless needed longer for investigating abuse/security incidents).</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Financial records</td>
                        <td className="p-2">7 years for accounting/tax compliance.</td>
                      </tr>
                      <tr>
                        <td className="p-2">Legal/Compliance Holds</td>
                        <td className="p-2">Retained as required by law or for ongoing proceedings.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 14 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">14. Cookies and Similar Technologies</h3>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies for operation, security, and analytics. Non-essential cookies require your consent. See our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
              </div>

              {/* Section 15 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">15. Your Rights Under UK Data Protection Law</h3>
                <p className="text-muted-foreground mb-3">
                  You have the right to: access, rectification, erasure, restriction, objection, data portability (for data provided under contract or consent), and to withdraw consent (where processing is based on consent). You can object to direct marketing at any time and we will stop.
                </p>
                <p className="text-muted-foreground">
                  To exercise these rights, contact <a href="mailto:privacy@opposia.com" className="text-primary hover:underline">privacy@opposia.com</a>. We may verify your identity and will respond within one month (subject to lawful extensions for complex requests).
                </p>
              </div>

              {/* Section 16 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">16. Children's Data (Under 18)</h3>
                <p className="text-muted-foreground">
                  Our Service is for adults 18+. We do not knowingly collect data from under-18s. If you believe a minor is using the Service, contact <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>.
                </p>
              </div>

              {/* Section 17 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">17. Complaints</h3>
                <p className="text-muted-foreground mb-3">
                  If you have concerns about how we use your personal data, please contact us first via our Privacy Complaints Form or at <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>. We will acknowledge your complaint within 30 days and respond without undue delay, keeping you appropriately informed where reasonable.
                </p>
                <p className="text-muted-foreground">
                  You also have the right to complain to the UK supervisory authority, the Information Commissioner's Office (ICO), at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>.
                </p>
              </div>

              {/* Section 18 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">18. Changes to This Policy</h3>
                <p className="text-muted-foreground">
                  We may update this policy from time to time. Material changes will be notified via email or a Service notice, and the "Last Updated" date will be revised.
                </p>
              </div>

              {/* Section 19 */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">19. Contact</h3>
                <div className="text-muted-foreground space-y-1">
                  <p><strong>Opposia Ltd</strong></p>
                  <p>167–169 Great Portland Street, 5th Floor, London, W1W 5PF</p>
                  <p>General Support: <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a></p>
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