const posts = [
  
  {
    id: 1,
    title: "Abir Hossain",
    href: "#",
    imageUrl:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/574E/production/_90805322_image_00006.jpg",
    date: "Feb 15, 2022",
    datetime: "2022-02-15",
    category: { title: "Programmer", href: "#" },
    author: {
      name: "Abir Hossain",
      role: "Computer Science and Engineering",
      href: "#",
      imageUrl:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/574E/production/_90805322_image_00006.jpg",
    },
    description:
      "Abir Hossain specializes in Node.js and React.js, making him an expert in modern web development. He has a talent for breaking down complex concepts into simple, understandable lessons, making him highly approachable for beginners. His patient and clear explanations make him an ideal mentor for anyone new to coding.",
  },
  {
    id: 2,
    title: "Kotha Islam",
    href: "#",
    imageUrl:
      "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/62A2/production/_90805252_image_00001.jpg.webp",
    date: "Mar 20, 2022",
    datetime: "2022-03-20",
    category: { title: "Bioinformatics", href: "#" },
    author: {
      name: "Kotha Islam",
      role: "Bioinformatics Educator",
      href: "#",
      imageUrl:
        "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/62A2/production/_90805252_image_00001.jpg.webp",
    },
    description:
      "Kotha Islam is passionate about teaching Bioinformatics and is dedicated to making the subject accessible to all students. She offers well-structured, easy-to-understand notes that simplify even the most complex topics in Bioinformatics. Her approach to teaching emphasizes clarity and comprehension, ensuring that students can grasp difficult concepts with ease.",
  },
  {
    id: 3,
    title: "Rafsan Karim",
    href: "#",
    imageUrl:
      "https://www.newagebd.com/files/records/news/202009/116708_161.jpg",
    date: "May 05, 2022",
    datetime: "2022-05-05",
    category: { title: "Python Programming", href: "#" },
    author: {
      name: "Rafsan Karim",
      role: "Python Programming Instructor",
      href: "#",
      imageUrl:
        "https://www.newagebd.com/files/records/news/202009/116708_161.jpg",
    },
    description:
      "Rafsan Karim is a seasoned professional in Python programming and data analysis. With years of experience in the industry, he excels at teaching Python to students of all levels. His approach focuses on practical, hands-on learning, allowing students to apply what they learn in real-world scenarios.",
  },
  {
    id: 4,
    title: "Maya Rahman",
    href: "#",
    imageUrl:
      "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/14D02/production/_90805258_image_00004.jpg.webp",
    date: "Jul 10, 2022",
    datetime: "2022-07-10",
    category: { title: "Cloud Computing", href: "#" },
    author: {
      name: "Maya Rahman",
      role: "Cloud Computing and DevOps Expert",
      href: "#",
      imageUrl:
        "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/14D02/production/_90805258_image_00004.jpg.webp",
    },
    description:
      "Maya Rahman is an expert in Cloud Computing and DevOps, with a deep understanding of modern IT infrastructure and software deployment. She simplifies the intricacies of cloud platforms like AWS and Azure, making them comprehensible for learners at any stage. Her teaching style is focused on real-world applications, providing students with practical knowledge that they can immediately put to use.",
  },
  {
    id: 5,
    title: "Tahsin Ahmed",
    href: "#",
    imageUrl:
      "https://thumbs.dreamstime.com/b/young-indian-student-man-red-checkered-shirt-jeans-posed-city-229834070.jpg",
    date: "Sep 25, 2022",
    datetime: "2022-09-25",
    category: { title: "Artificial Intelligence", href: "#" },
    author: {
      name: "Tahsin Ahmed",
      role: "AI and Machine Learning Specialist",
      href: "#",
      imageUrl:
        "https://thumbs.dreamstime.com/b/young-indian-student-man-red-checkered-shirt-jeans-posed-city-229834070.jpg",
    },
    description:
      "Tahsin Ahmed is a specialist in Artificial Intelligence and Machine Learning, with extensive experience in developing and deploying intelligent systems. His teaching approach emphasizes understanding the core concepts and algorithms that power AI technologies. Tahsin is known for his ability to break down complex theories into digestible lessons, making Machine Learning accessible to both beginners and advanced students.",
  },
  {
    id: 6,
    title: "Shaila Haque",
    href: "#",
    imageUrl:
      "https://st2.depositphotos.com/37996792/42271/i/450/depositphotos_422718976-stock-photo-pretty-young-indian-woman-using.jpg",
    date: "Nov 12, 2022",
    datetime: "2022-11-12",
    category: { title: "Cybersecurity", href: "#" },
    author: {
      name: "Shaila Haque",
      role: "Cybersecurity and Ethical Hacking Educator",
      href: "#",
      imageUrl:
        "https://st2.depositphotos.com/37996792/42271/i/450/depositphotos_422718976-stock-photo-pretty-young-indian-woman-using.jpg",
    },
    description:
      "Shaila Haque is an accomplished educator in Cybersecurity and Ethical Hacking, with a deep passion for protecting digital assets. With her vast knowledge of network security, encryption, and ethical hacking practices, she guides students through the complexities of cybersecurity with ease. Shaila's teaching is highly interactive, involving simulations and practical exercises that equip students with the skills needed to identify and mitigate security threats.",
  },
];

export default function Counselors() {
return (
  <div className="bg-gradient-to-tr from-[#6ec0ff] to-[#fffdba] py-12">
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">New Counselors</h2>
        <p className="mt-2 text-lg text-gray-600">
          Learn how to grow your skill with our expert advice.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col items-start justify-between bg-white rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
            <div className="relative w-full overflow-hidden rounded-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-center gap-x-3 text-xs">
                <a
                  href={post.category.href}
                  className="rounded-full bg-gray-50 px-3 py-1.5 text-gray-600 hover:bg-gray-100">
                  {post.category.title}
                </a>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">
                <a href={post.href}>{post.title}</a>
              </h3>
              <p className="mt-2 text-sm text-gray-600">{post.description}</p>
              <div className="mt-4 flex items-center gap-x-4">
                <img
                  src={post.author.imageUrl}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full bg-gray-100"
                />
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>{post.author.name}</a>
                  </p>
                  <p>{post.author.role}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);
}
