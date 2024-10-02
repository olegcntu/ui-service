import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

function TermsAndConditions() {
    return (
        <>
            <Meta title={'Terms And Conditions'} />
            <BreadCrumb title="Terms And Conditions" />
            <Container className="policy-wrapper py-5 home-wrapper-2">
                <div className="col-12">
                    <div className="policy">
                        <h2>Terms And Conditions</h2>
                        <p>
                            Please read these terms and conditions carefully before using our website or placing an order. By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms and conditions, please do not use our website.
                        </p>
                        <h3>1. Intellectual Property</h3>
                        <p>
                            The content on our website, including text, images, logos, and trademarks, is protected by intellectual property laws and is the property of our company. You may not use, reproduce, or distribute any of the content without our prior written permission.
                        </p>
                        <h3>2. User Conduct</h3>
                        <p>
                            When using our website, you agree to comply with all applicable laws and regulations. You are solely responsible for your conduct and any content you submit or post on our website. Prohibited activities include, but are not limited to:
                        </p>
                        <ul>
                            <li>Posting or transmitting unauthorized or unsolicited advertising or promotional material.</li>
                            <li>Interfering with the operation of our website or disrupting the access of other users.</li>
                            <li>Uploading or distributing viruses, malware, or any other harmful software.</li>
                            <li>Engaging in any activity that violates the rights of others.</li>
                        </ul>
                        <h3>3. Privacy</h3>
                        <p>
                            We respect your privacy and handle your personal information in accordance with our Privacy Policy. By using our website, you consent to the collection, use, and disclosure of your personal information as described in our Privacy Policy.
                        </p>
                        <h3>4. Disclaimer</h3>
                        <p>
                            Our website and its content are provided on an "as is" basis without any warranties, expressed or implied. We do not guarantee the accuracy, completeness, or reliability of the content. Your use of our website is at your own risk.
                        </p>
                        <h3>5. Limitation of Liability</h3>
                        <p>
                            We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our website. This includes damages for lost profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default TermsAndConditions;
