import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const SafetyModerationPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Safety & Moderation Policy</h1>
            <p className="text-lg text-muted-foreground">OPPOSIA LTD</p>
            <p className="text-sm text-muted-foreground mt-2">Last Updated: 14/01/2026</p>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Our Commitment to Safety</h3>
              <p className="text-muted-foreground">
                Opposia Ltd is committed to fostering a respectful and secure environment. This Safety & Moderation Policy outlines our approach to user reports, content moderation, and account enforcement. It forms part of our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and Acceptable Use Policy.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">2. User Reporting</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="mb-2"><strong>2.1 How to Report:</strong> Users can report concerning behaviour, profiles, or content via the in-app reporting function or by emailing <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a>.</p>
                </div>
                <div>
                  <p className="mb-2"><strong>2.2 Information Required:</strong> To allow for effective investigation, reports should include:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>The username(s) involved.</li>
                    <li>A clear description of the issue.</li>
                    <li>Relevant evidence (e.g., screenshots of messages, profile details). Please do not edit or alter this evidence.</li>
                  </ul>
                </div>
                <div>
                  <p><strong>2.3 Good Faith Reporting:</strong> Reports should be made in good faith. Knowingly making false or malicious reports may result in action against the reporter's account.</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Our Moderation Process</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>3.1 Acknowledgement & Triage:</strong> We will acknowledge receipt of a report within 24 hours on business days. Reports are triaged based on severity, with immediate threats to physical safety prioritised.</p>
                <p><strong>3.2 Investigation:</strong> Our moderation team will investigate by reviewing the report, the involved profiles, message logs (where relevant and permissible under our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>), and any provided evidence.</p>
                <p><strong>3.3 Decision-Making:</strong> Actions are based on the available evidence, the severity of the breach, and the user's prior conduct. We act in accordance with this policy and our Terms, but decisions are made at our reasonable discretion.</p>
                <p><strong>3.4 Confidentiality:</strong> The specifics of an investigation and any actions taken against another user will be kept confidential to protect all parties' privacy and security.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">4. Potential Enforcement Actions</h3>
              <p className="text-muted-foreground mb-4">Depending on the nature and severity of the violation, we may take one or more of the following actions:</p>
              <div className="space-y-3 text-muted-foreground">
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>No Action:</strong> If we find insufficient evidence of a policy breach.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Warning:</strong> A formal notice to the user that their conduct violates our policies.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Temporary Suspension:</strong> Temporary loss of platform access for a defined period.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Account Termination:</strong> Permanent removal from the platform for severe or repeated violations.</p>
                </div>
                <div className="pl-4 border-l-2 border-primary/30">
                  <p><strong>Reporting to Authorities:</strong> Where we have a reasonable belief that a user's activity is illegal or poses a serious threat to others, we reserve the right to report the activity and relevant data to law enforcement or other appropriate authorities, as permitted by our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and the law.</p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">5. User Appeals</h3>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>5.1 Right to Appeal:</strong> If your account is suspended or terminated, you may appeal the decision by emailing <a href="mailto:support@opposia.com" className="text-primary hover:underline">support@opposia.com</a> within 14 days of our enforcement notification.</p>
                <p><strong>5.2 Appeal Process:</strong> Your appeal will be reviewed by a moderator not involved in the initial decision. You may provide a concise statement and any additional relevant evidence.</p>
                <p><strong>5.3 Outcome:</strong> We will inform you of the appeal outcome within 14 days. Our decision following an appeal is final.</p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">6. Proactive Safety Measures</h3>
              <p className="text-muted-foreground mb-4">In addition to reacting to reports, we employ proactive measures including:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Automated systems to scan for certain prohibited content.</li>
                <li>User-blocking and profile-filtering tools.</li>
                <li>Promotion of safety advice within the platform.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">7. Important Limitations</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p><strong>No Guarantee:</strong> We cannot monitor all interactions and do not guarantee the immediate removal of all objectionable content or the prevention of all harmful conduct.</p>
                </div>
                <div>
                  <p><strong>Off-Platform Activity:</strong> We have no control over, and cannot take action regarding, interactions that occur away from the Opposia platform (e.g., on other messaging services, social media, or in person).</p>
                </div>
                <div>
                  <p><strong>Your Responsibility:</strong> Your personal safety is your responsibility. We provide tools and processes, but you must exercise your own judgment. Please review the safety advice in our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>.</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact</h3>
              <div className="text-muted-foreground">
                <p className="font-medium">Opposia Ltd</p>
                <p>Company No. 16955158</p>
                <p>167–169 Great Portland Street, 5th Floor, London, W1W 5PF</p>
                <p className="mt-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@opposia.com" className="text-primary hover:underline">
                    support@opposia.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SafetyModerationPolicyPage;
