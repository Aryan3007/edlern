import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Meditation Mastery: From Novice to Daily Practitioner',
    instructor: 'Olivia Martinez',
    progress: 40,
    image: 'https://images.unsplash.com/photo-1716404018666-2b4e5e0a1ff5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Mindful Leadership: Leading with Presence',
    instructor: 'John Rose',
    progress: 15,
    image: 'https://images.unsplash.com/photo-1716404018666-2b4e5e0a1ff5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Stress Management: A Mindful Approach',
    instructor: 'Sophia Lee',
    progress: 60,
    image: 'https://images.unsplash.com/photo-1716404018666-2b4e5e0a1ff5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const AllCourses: React.FC = () => {
  const navigate = useNavigate();

  const handleViewCourse = (courseId: number) => {
    navigate(`/community/courses/${courseId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleViewCourse(course.id)}
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${course.image})` }}
            ></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-500">{course.instructor}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm text-gray-500">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-lime-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;