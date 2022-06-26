/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { CLIENT_URL, SERVER_URL } from 'utils/config';

function HomePage() {
    return (
        <div className='px-12 w-full h-full flex flex-col'>
            <div className='top-24 absolute after:block after:w-full after:h-4 text-qpurple after:bg-qpurple-light after:opacity-50 after:-mt-3 after:bg-opacity-60 text-4xl font-bold'>Configuring LTI Pro 1.3 for Moodle</div>
            <p className="text-gray-400 italic text-sm mt-36">Last updated: Mar 16 2022</p>
            <p className="text-gray-400 text-sm italic">Author: Kim Ngan Dinh Phan</p>
            <div className='mt-4 mb-20'>
                <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Step 1: Install Moodle Plugin</h3>
                <ol className='list-decimal pl-20 py-1 leading-7'>
                    <li>Log in to Moodle as an Admin.</li>
                    <li>Click <b> Site administration </b>, then <b> Plugins </b>.</li>
                    <li>Click Install <b> Plugins </b>.</li>
                    <li>Click <a className='hover:text-qpurple text-qpurple-light underline italic' href='https://drive.google.com/file/d/1EmUvGNBcLfkFyDOCL5KZ52_Jrmua09yp/view?usp=sharing' target="blank">here</a> to download .zip file and upload to Moodle.</li>
                    <li>Submit.</li>
                </ol>
                <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Step 2: Creating a new credential</h3>
                <ol className='list-decimal pl-20 py-1 leading-7'>
                    <li>Login (or create a new account) in <a href={`/platform`} className='hover:text-qpurple text-qpurple-light underline italic' target="blank" rel="noopener noreferrer">LTI Configuration Page</a></li>
                    <li>Click Create a new LTI credential.</li>
                    <li>Enter new credential name and click Next.</li>
                    <li>Back to Moodle and follow the instructions below. (Keep this page open for further configurations)</li>
                </ol>
                <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Step 3: Creating a Client ID in Moodle</h3>
                <ol className='list-decimal pl-20 py-1 leading-7'>
                    <li>Log in to Moodle as an Admin.</li>
                    <li>Click <b> Site administration </b>, then <b> Plugins </b>.</li>
                    <li>Click External tool, then Manage tools.</li>
                    <li>Click configure a tool manually.</li>
                </ol>
                <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Step 4: Configuring the external tool</h3>
                <ol className='list-decimal pl-20 py-1 leading-7'>
                    <li>Enter "NewQuizzes" in the Tool name field.</li>
                    <li>Copy the Target Link URL in the LTI Configuration Page, and paste it in the Tool URL field.</li>
                    <li>For LTI version, choose LTI 1.3.</li>
                    <li>For Public key type, choose Keyset URL.</li>
                    <li>Copy the Public JWK URL in the LTI Configuration Page, and paste it in the Public keyset field.</li>
                    <li>Copy the Tool Redirect URL in the LTI Configuration Page, and paste it in the Redirection URI(s) field.</li>
                    <li>Copy the Login Initiation URL in the LTI Configuration Page to, and paste it in the Initiate login URL field.</li>
                    <li>At Tool configuration usage: Choose "Show in activity chooser and as a preconfigured tool"</li>
                    <li>At Default launch container: Choose "New window"</li>
                    <li>At Services Section:
                        <br />{`IMS LTI Assignment and Grade Services: Choose "Use this service for grade sync and column manageme"`}
                        <br />{`IMS LTI Names and Role Provisioning: Choose "Use this service to retrieve members' information as per privacy settings"`}
                        <br />{`Tool Settings: Choose "Use this service"`}
                    </li>
                    <li>At Privacy Section:
                        <br />{`Share launcher's name with tool: "Always"`}
                        <br />{`Share launcher's email with tool: "Always"`}
                        <br />{`Accept grades from the tool: "Always"`}
                    </li>
                    <li>Click Save Changes.</li>
                </ol>
                <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Step 5: Continuing configure </h3>
                <ol className='list-decimal pl-20 py-1 leading-7'>
                    <li>Find the Tool that was created (step 4) in the Manage tools page of Moodle.</li>
                    <li> 
                        <div className="flex gap-2">
                            Click <span><img alt="list icon" className='w-6 h-6' src="/list.png"/></span> to view configuration details.  
                        </div>
                    </li>
                    <li>Back to LTI Configuration Page, Copy Platform ID and Client ID and parse them in corresponding fields.</li>
                    <li>With Access Token field, back to Moodle.</li>
                    <li>Click <b> Site administration </b>, then Server.</li>
                    <li>Click Manage tokens at Web services section.</li>
                    <li>Copy the Token of Admin User and parse it in the Access Token field of LTI Configuration Page.</li>
                    <li>Click Save. Now your LTI plugin is ready!</li>
                </ol>
                <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Step 5: Adding the Tool to Moodle Course</h3>
                <ol className='list-decimal pl-20 py-1 leading-7'>
                    <li>On Moodle go to the course that you want to add the Tool to.</li>
                    <li>Click Turn editing on, then click Add an activity or resource.</li>
                    <li>Click External tool.</li>
                    <li>For Activity name, enter the name of the activity.</li>
                    <li>For Preconfigured tool, choose the Tool created earlier.</li>
                    <li>Click Save and return to course.</li>
                </ol>
                <h3 className='text-2xl mt-4 mb-1 text-qpurple font-bold'>Step 6: Launching the LTI 1.3 tool</h3>
                <ol className='list-decimal pl-20 py-1 leading-7'>
                    <li>Click the link to the Tool that was just added earlier and the LTI Pro user interface should appear:</li>
                </ol>
            </div>
        </div>
    );
}

export default HomePage;