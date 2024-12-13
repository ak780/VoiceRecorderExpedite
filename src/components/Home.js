import React from 'react';
import './recorder.css';

const Home = () => {
    return (
        <div className="home">
            <h1 className="home-title">Welcome to the Voice Recorder</h1>
            <p className="home-developer">Developed by Ayush Katiyar</p>
            <div className="skills-section">
                <p className="skills-text">
                    I specialize in full-stack development with expertise in <strong>Node.js</strong>, <strong>React</strong>, <strong>Redux</strong>, <strong>AWS (Lambda, S3, DynamoDB, API Gateway)</strong>, <strong>Terraform</strong>, <strong>GraphQL</strong>, <strong>Serverless Framework</strong>, <strong>Python</strong>, <strong>C++</strong>, <strong>Generative AI</strong>, and secure payment integrations using APIs like <strong>Worldline</strong>. My experience spans developing scalable solutions, optimizing system performance, and working with cloud infrastructure and databases to deliver robust applications.
                </p>
            </div>
            <div className="experience-section">
                <h2 className="section-title">My Technical Experience</h2>
                <div className="experience-cards">
                    <div className="card">
                        <h3>Anchor Operating System</h3>
                        <p>
                            Contributed to a B2B SaaS ticketing platform, increasing client acquisition by 25%. Delivered over 500 features/updates and resolved 150+ critical bugs.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Generative AI Multilingual Chatbot</h3>
                        <p>
                            Developed a multilingual chatbot with <strong>AWS Bedrock</strong>, <strong>Translate</strong>, <strong>Lex</strong>, <strong>Node.js</strong>, and <strong>React</strong>, achieving 98% chatbot accuracy.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Worldline Payment Gateway Integration</h3>
                        <p>
                            Integrated the <strong>Worldline Payment Gateway</strong> for secure payment and refunds processing in the products.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Data Streaming</h3>
                        <p>
                            Extracted and streamed data from 150+ DynamoDB tables (~20 TB) for ETL into a Data Lake using <strong>EC2</strong>, <strong>Lambda</strong>, and <strong>Event Bridge</strong>.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Hybrid Caching Implementation</h3>
                        <p>
                            Increased ticket availability speed by 80% using a hybrid caching solution with <strong>DynamoDB</strong>, <strong>AWS Lambda</strong>, and <strong>S3</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
