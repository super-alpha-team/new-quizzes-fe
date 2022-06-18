import PlatformHeader from 'components/app/platform/PlatformHeader';
import React from 'react';

function LTIConfig() {
    return (
        <div className='min-h-screen w-full h-full'>
            <PlatformHeader />
            <div className='px-12 w-full h-full flex flex-col'>
                <div className='top-24 absolute after:block after:w-full after:h-4 text-qpurple after:bg-qpurple-light after:opacity-50 after:-mt-3 after:bg-opacity-60 text-4xl font-bold'>Configuring LTI Pro 1.3 for Moodle</div>
                <p className="text-gray-400 italic text-sm mt-36">Last updated: Mar 16 2022</p>
                <p className="text-gray-400 text-sm italic">Author: Kim Ngan Dinh Phan</p>
                <div className='mt-4 mb-20'>
                    <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Creating new credentials</h3>
                    <ol className='list-decimal pl-20 py-1 leading-7'>
                        <li>Create a new LTI credential.</li>
                        <li>(Optional) Update a credential from LTI 1.1. to LTI 1.3. in the configuration page by choosing LTI 1.3 under Select which LTI version to use.</li>
                        <li>Click Save.</li>
                    </ol>
                    <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Creating a Client ID in Moodle</h3>
                    <ol className='list-decimal pl-20 py-1 leading-7'>
                        <li>Log in to Moodle as an Admin.</li>
                        <li>Click Site administration, then Plugins.</li>
                        <li>Click External tool, then Manage tools.</li>
                        <li>Click configure a tool manually.</li>
                    </ol>
                    <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Configuring the external tool</h3>
                    <ol className='list-decimal pl-20 py-1 leading-7'>
                        <li>Enter name of the tool in the Tool name field.</li>
                        <li>Copy the Target Link URL in the LTI configuration page, and paste it in the Tool URL field.</li>
                        <li>For LTI version, choose LTI 1.3.</li>
                        <li>For Public key type, choose Keyset URL.</li>
                        <li>Copy the Public JWK URL in the LTI configuration page, and paste it in the Public keyset field.</li>
                        <li>Copy the Tool Redirect URL in the LTI configuration page, and paste it in the Redirection URI(s) field.</li>
                        <li>Copy the Login Initiation URL in the LTI configuration page to, and paste it in the Initiate login URL field.</li>
                        <li>Click Save Changes.</li>
                    </ol>
                    <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Adding the Client ID to LTI Pro Credentials</h3>
                    <ol className='list-decimal pl-20 py-1 leading-7'>
                        <li>Find the Tool that was created earlier in the Manage tools page of Moodle.</li>
                        <li>Click View configuration details.</li>
                        <li>On LTI Pro Configuration page, click 3rd Party Credentials.</li>
                        <li>Click LTI Moodle, then click Add Instance.</li>
                        <li>Add the domain used to access Moodle in the LTI Moodle Site Domain.</li>
                        <li>Copy the Moodle tool Client ID, and paste it into the LTI Advantage Client ID field.</li>
                        <li>Click Save.</li>
                    </ol>
                    <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Adding the Tool to Moodle Course</h3>
                    <ol className='list-decimal pl-20 py-1 leading-7'>
                        <li>On Moodle go to the course that you want to add the Tool to.</li>
                        <li>Click Turn editing on, then click Add an activity or resource.</li>
                        <li>Click External tool.</li>
                        <li>For Activity name, enter the name of the activity.</li>
                        <li>For Preconfigured tool, choose the Tool created earlier.</li>
                        <li>Click Save and return to course.</li>
                    </ol>
                    <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Launching the LTI 1.3 tool</h3>
                    <ol className='list-decimal pl-20 py-1 leading-7'>
                        <li>Click the link to the Tool that was just added earlier and the LTI Pro user interface should appear:</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default LTIConfig;