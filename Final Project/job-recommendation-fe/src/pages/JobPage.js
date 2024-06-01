import React, { useEffect, useRef, useState } from "react";
import Selection from "../components/Selection/Selection";
import DropBox from "../components/DropBox/DropBox";
import TechBox from "../components/TechBox/TechBox";
import axios from "axios";
import JobList from "../components/Job/JobList";
export default function Jobpage() {
  const cvRef = useRef();
  const skillsRef = useRef();
  const [techskills, setTechSkills] = useState([]);
  const [jobDataDrop, setJobDataDrop] = useState([]);
  const [jobDataBox, setJobDataBox] = useState([]);
  const handleSubmit = async () => {
    if (techskills.length === 0) {
      alert("Please choose at least one skill");
    } else {
      const skills = techskills.map((item) => item.value).join(" ");
      const formData = new FormData();
      formData.append("text_data", skills);
      try {
        const respone = await axios.post(
          "http://127.0.0.1:5000/techskills",
          formData
        );
        setJobDataBox(respone.data.text);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <div className="min-h-[1900px]">
      <div className="relative pt-[180px]">
        <div className="bg-[#1fc76a] h-[200px] rounded-b-lg pt-[70px] flex flex-col absolute top-0 right-0 left-0 z-[-1]">
          <div className="container">
            <h1 className="leading-[1.5] text-[32px] text-white font-bold after:content-['DS108'] after:text-yellow-300">
              Team 22 .
            </h1>
            <span className="text-white text-[17px] leading-[1.5] my-4 block">
              Explore jobs by your cv or your IT skills
            </span>
          </div>
        </div>
        <div className="container flex flex-col gap-10px">
          <div className="flex max-[1023.98px]:flex-col justify-between gap-[80px]">
            <Selection
              id="Selection"
              description="Recommend jobs based on your resume. Your CV has to be written in
        English and has pdf format."
              destination="cv"
              title="Resume Checker"
              img_link="/Cv_Checker.svg"
              ref={cvRef}
            ></Selection>
            <Selection
              description="Recommend jobs based on your IT skills. You will choose IT Skill in tech stack."
              destination="skills"
              title="Skills Checker"
              img_link="/Skills_Checker.png"
              ref={skillsRef}
            ></Selection>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-[80px] flex flex-col gap-[20px]" ref={cvRef}>
          <h1 className="text-xl font-semibold leading-normal">
            Recommend Job By Your CV
          </h1>
          <DropBox setJobData={setJobDataDrop} jobData={jobDataDrop}></DropBox>
        </div>
        <div className="mt-[40px]">
          {jobDataDrop && jobDataDrop.length > 0 && (
            <JobList data={jobDataDrop}></JobList>
          )}
        </div>
        <div
          className="mt-[80px] flex flex-col gap-[20px] mb-10"
          ref={skillsRef}
        >
          <h1 className="text-xl font-semibold leading-normal">
            Recommend Job By Your IT Skills
          </h1>
          <TechBox
            techskills={techskills}
            setTechSkills={setTechSkills}
          ></TechBox>
          <div className="mt-2 flex justify-end">
            <button
              className="px-3 py-2 rounded-lg bg-[#1fc76a] text-white font-semibold"
              onClick={handleSubmit}
            >
              Recommend
            </button>
          </div>
        </div>
        <div className="mt-[150px]">
          {jobDataBox && jobDataBox.length > 0 && (
            <JobList data={jobDataBox}></JobList>
          )}
        </div>
      </div>
    </div>
  );
}
