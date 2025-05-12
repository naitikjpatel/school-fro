import React from "react";

const About = () => {
    return (
        <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">About Our School</h2>
          <p className="mt-4 text-lg text-gray-600">Committed to Excellence in Education</p>
        </div>
      
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="flex items-center justify-center bg-white p-6 shadow-lg rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
              <p className="mt-4 text-gray-600">To foster a nurturing environment that encourages holistic development and academic excellence.</p>
            </div>
          </div>
      
        
          <div className="flex items-center justify-center bg-white p-6 shadow-lg rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Our Values</h3>
              <ul className="mt-4 text-gray-600 list-disc list-inside">
                <li>Integrity</li>
                <li>Respect</li>
                <li>Innovation</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
        </div>
      
        
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center text-gray-800">Meet Our Team</h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              {/* <img className="w-24 h-24 rounded-full" src="team-member1.jpg" alt="Team Member 1"> */}
              <h4 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h4>
              <p className="mt-2 text-gray-600">Principal</p>
            </div>
        
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              {/* <img className="w-24 h-24 rounded-full" src="team-member2.jpg" alt="Team Member 2"> */}
              <h4 className="mt-4 text-xl font-semibold text-gray-800">Jane Smith</h4>
              <p className="mt-2 text-gray-600">Vice Principal</p>
            </div>
        
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              {/* <img className="w-24 h-24 rounded-full" src="team-member3.jpg" alt="Team Member 3"> */}
              <h4 className="mt-4 text-xl font-semibold text-gray-800">Emily Johnson</h4>
              <p className="mt-2 text-gray-600">Head of Curriculum</p>
            </div>
          </div>
        </div>
      </section>
      
    );
};

export default About;