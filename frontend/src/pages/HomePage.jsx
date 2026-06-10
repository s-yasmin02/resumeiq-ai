import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const HomePage = () => {
  return (
    <div className="bg-[#030712] text-gray-100 font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-[90vh]">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 font-medium mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
              ResumeIQ 2.0 is now live
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Unlock Your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600">
                Career Potential
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our AI-powered ATS Resume Analyzer scans your resume against industry standards, providing actionable insights to help you land your dream job faster.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] transition-all transform hover:-translate-y-1 w-full sm:w-auto">
                Get Started for Free
              </Link>
              <Link to="/login" className="px-8 py-4 rounded-full text-lg font-semibold bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm text-gray-300 hover:text-white transition-all w-full sm:w-auto">
                View Live Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-24 bg-[#0B1120]/50 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">Supercharge Your Resume</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to beat the Applicant Tracking Systems and get noticed by recruiters.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ATS Scoring',
                desc: 'Instantly see how well your resume matches standard ATS criteria with a detailed percentage score.',
                icon: <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              },
              {
                title: 'AI Insights',
                desc: 'Get personalized feedback powered by OpenAI on your executive summary, missing sections, and formatting.',
                icon: <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              },
              {
                title: 'Job Match Analysis',
                desc: 'Paste a job description and instantly discover missing keywords and skills you need to add to rank higher.',
                icon: <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition duration-300 group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">Three simple steps to significantly improve your interview callback rate.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-blue-500/0"></div>

            {[
              { step: '01', title: 'Upload Resume', desc: 'Securely upload your resume in PDF format. We keep your data private.' },
              { step: '02', title: 'AI Analysis', desc: 'Our AI scans your text, extracting skills, structure, and identifying flaws.' },
              { step: '03', title: 'Apply Insights', desc: 'Follow our personalized suggestions and tailor your resume for the exact job.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative text-center"
              >
                <div className="w-24 h-24 mx-auto bg-[#030712] border-4 border-purple-500/30 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed px-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="py-24 bg-[#0B1120]/50 border-y border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">Loved by Job Seekers</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">See how ResumeIQ has helped professionals land roles at top companies.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Sarah J.', role: 'Software Engineer', text: 'ResumeIQ pointed out missing keywords I never would have thought of. I got interviews at Google and Meta within two weeks.' },
              { name: 'David M.', role: 'Product Manager', text: 'The Job Match feature is a game-changer. Tailoring my resume used to take hours, now it takes minutes.' },
              { name: 'Elena R.', role: 'Marketing Specialist', text: 'I bumped my ATS score from 45% to 92% following the AI Insights. The feedback is incredibly accurate.' }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-[#030712] border border-white/10 p-8 rounded-3xl shadow-xl"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</motion.h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'What is an ATS?', a: 'An Applicant Tracking System (ATS) is software used by employers to filter, manage, and rank job applications. Over 90% of Fortune 500 companies use an ATS.' },
              { q: 'Is my data secure?', a: 'Yes. We process your resume to generate insights and you maintain full control. You can delete your uploaded resumes at any time from your dashboard.' },
              { q: 'How does the AI analysis work?', a: 'We use OpenAI\'s advanced language models to read your resume like a human recruiter would, extracting skills and comparing your format to proven successful resumes.' },
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl"
              >
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call To Action Section */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 p-12 md:p-20 rounded-[3rem] backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">Ready to beat the ATS?</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">Join thousands of professionals who have optimized their resumes and landed their dream roles.</motion.p>
            
            <motion.div variants={fadeInUp} className="relative z-10">
              <Link to="/register" className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                Start Analyzing For Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
