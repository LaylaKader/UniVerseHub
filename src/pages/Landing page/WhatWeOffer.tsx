import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WithStyles from "./WithStyles"; // Adjust the path as per your file structure

const WhatWeOffer: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center mx-[600px]  text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-500 to-red-500">
        <h2 className="font-semibold text-4xl">What </h2>
        <h2 className="font-semibold text-4xl ml-2">we offer</h2>
      </div>

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable>
        <WithStyles
          description="A personalized section where students can manage their information, track their academic progress, and access their study materials"
          headline="Personal profile"
          image="https://img.freepik.com/free-vector/buyer-persona-infographics-flat-design_23-2148659313.jpg?t=st=1724678571~exp=1724682171~hmac=6dd2ce4c98ce11513844d3f59909026574498147c1955474de4bd3f0075b5f50&w=826"
        />
        <WithStyles
          description="Dedicated pages displaying all available courses, including details"
          headline="Course Pages"
          image="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg"
        />
        <WithStyles
          description="A feature allowing students to join or create virtual study groups for collaborative learning and discussion"
          headline="Group Study session"
          image="https://www.euroschoolindia.com/wp-content/uploads/2023/07/student-study-group.jpg"
        />
        <WithStyles
          description="Personal chat enables one-on-one communication between students"
          headline="Personal chat"
          image="https://img.freepik.com/premium-vector/people-with-voice-chat-concept-communication-interaction-social-networks-messengers-young_118813-17364.jpg?w=826"
        />
        <WithStyles
          description="Group chat allows multiple users to communicate and collaborate in a shared space."
          headline="Group chat"
          image="https://img.freepik.com/free-vector/people-communicating-via-social-media_74855-5551.jpg?t=st=1724680502~exp=1724684102~hmac=639f218cfafda1beb5fcd6b3a6518f0a6f3e7e8d2d35ad2c2bcd747b61a2b413&w=826"
        />

        <WithStyles
          description="Scheduled sessions where students can receive academic and personal guidance from teachers either in-person or via online platforms.
"
          headline="Counselling Session"
          image="https://img.freepik.com/premium-vector/online-learning-online-education-illustration_677179-150.jpg?w=826"
        />
        <WithStyles
          description="An FAQ chatbot providing students with instant answers to frequently asked questions about the university"
          headline="FAQ chatbot "
          image="https://media.licdn.com/dms/image/C5112AQELgeupKI0j7w/article-cover_image-shrink_600_2000/0/1535886512664?e=2147483647&v=beta&t=gt8QUhDw7mQ1jH0RPu89AhC5ENXyFqjDG0YqWXNE6cU"
        />
        <WithStyles
          description="A feature allowing students to upload, share, and access various academic resources like notes, textbooks, and questions of previous trimester"
          headline="Resource sharing "
          image="https://img.freepik.com/free-vector/telecommuting-concept_23-2148492423.jpg?t=st=1724681073~exp=1724684673~hmac=1c9089e7ed05159ad6f38adefb6ccb79178adbf916973f35b4918640a37b7266&w=826"
        />
      </Carousel>
    </div>
  );
};

export default WhatWeOffer;
