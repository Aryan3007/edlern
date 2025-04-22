import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Lock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Lesson {
    id: number;
    title: string;
    completed: boolean;
    locked: boolean;
}

interface Section {
    id: number;
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: number;
    title: string;
    instructor: string;
    progress: number;
    image: string;
    sections: Section[];
}

const courses: Course[] = [
    {
        id: 1,
        title: 'Meditation Mastery: From Novice to Daily Practitioner',
        instructor: 'Olivia Martinez',
        progress: 40,
        image: 'https://images.unsplash.com/photo-1716404018666-2b4e5e0a1ff5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        sections: [
            {
                id: 1,
                title: 'Foundations of Meditation',
                lessons: [
                    { id: 1, title: 'Introduction to Meditation', completed: true, locked: false },
                    { id: 2, title: 'Setting Intentions and Goals', completed: true, locked: false },
                    { id: 3, title: 'Creating Your Meditation Space', completed: true, locked: false },
                    { id: 4, title: 'Breath Awareness Meditation', completed: true, locked: false },
                    { id: 5, title: 'Body Scan Meditation', completed: false, locked: false }
                ]
            },
            {
                id: 2,
                title: 'Deepening Your Practice',
                lessons: [
                    { id: 6, title: 'Mindfulness Meditation', completed: false, locked: false },
                    { id: 7, title: 'Common Challenges', completed: false, locked: false },
                    { id: 8, title: 'Loving-Kindness Meditation', completed: false, locked: false },
                    { id: 9, title: 'Visualization Techniques', completed: false, locked: false },
                    { id: 10, title: 'Mindfulness into Daily Life', completed: false, locked: false }
                ]
            },
            {
                id: 3,
                title: 'Advanced Practices',
                lessons: [
                    { id: 11, title: 'Dealing and Emotions', completed: false, locked: true },
                    { id: 12, title: 'Building a Consistent Practice', completed: false, locked: true },
                    { id: 13, title: 'Pro Meditation Techniques', completed: false, locked: true }
                ]
            }
        ]
    },

];

const CoursesPage: React.FC = () => {
    const [expandedCourse, setExpandedCourse] = useState<number | null>(1);
    const [selectedLesson, setSelectedLesson] = useState<{ courseId: number, lessonId: number } | null>({
        courseId: 1,
        lessonId: 1
    });

    const toggleCourse = (courseId: number) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

   

    const selectLesson = (courseId: number, lessonId: number) => {
        setSelectedLesson({ courseId, lessonId });
    };

    const getSelectedLesson = () => {
        if (!selectedLesson) return null;

        const course = courses.find(c => c.id === selectedLesson.courseId);
        if (!course) return null;

        for (const section of course.sections) {
            const lesson = section.lessons.find(l => l.id === selectedLesson.lessonId);
            if (lesson) {
                return { course, section, lesson };
            }
        }

        return null;
    };

    const selectedLessonData = getSelectedLesson();

    return (
        <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1  space-y-4">
                    {courses.map(course => (
                        <div key={course.id} className="bg-white sticky top-0 rounded-lg shadow overflow-hidden">
                            <div
                                className="p-4 border-b cursor-pointer flex items-center justify-between"
                                onClick={() => toggleCourse(course.id)}
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-md bg-cover bg-center mr-3" style={{ backgroundImage: `url(${course.image})` }}></div>
                                    <div>
                                        <h3 className="font-medium">{course.title}</h3>
                                        <p className="text-sm text-gray-500">{course.instructor}</p>
                                    </div>
                                </div>
                                {expandedCourse === course.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>

                            {expandedCourse === course.id && (
                                <div className="p-4">
                                    <div className="mb-4">
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

                                    <div className="space-y-2">
                                        {course.sections.map(section => (
                                            <Accordion key={section.id} type="single" collapsible>
                                                <AccordionItem value={`section-${section.id}`}>
                                                    <AccordionTrigger>
                                                        <h4 className="font-medium">{section.title}</h4>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="p-2">
                                                            {section.lessons.map(lesson => (
                                                                <div
                                                                    key={lesson.id}
                                                                    onClick={() => !lesson.locked && selectLesson(course.id, lesson.id)}
                                                                    className={`flex items-center p-2 rounded-md cursor-pointer ${selectedLesson?.courseId === course.id && selectedLesson?.lessonId === lesson.id
                                                                        ? 'bg-lime-100 text-lime-700'
                                                                        : lesson.locked ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
                                                                        }`}
                                                                >
                                                                    {lesson.completed ? (
                                                                        <CheckCircle size={18} className="text-green-500 mr-2" />
                                                                    ) : lesson.locked ? (
                                                                        <Lock size={18} className="text-gray-400 mr-2" />
                                                                    ) : (
                                                                        <div className="h-4 w-4 rounded-full border-2 border-gray-300 mr-2"></div>
                                                                    )}
                                                                    <span className={lesson.locked ? 'text-gray-400' : ''}>{lesson.title}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-2">
                    {selectedLessonData ? (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-semibold">{selectedLessonData.lesson.title}</h2>
                                <p className="text-sm text-gray-500">
                                    Lesson {selectedLessonData.lesson.id} of {selectedLessonData.course.sections.reduce((total, section) => total + section.lessons.length, 0)}
                                </p>
                            </div>

                            <div className="p-4">
                                <div className="aspect-video rounded-lg bg-gray-100 mb-6 overflow-hidden">
                                    <img
                                        src={selectedLessonData.course.image || "/placeholder.svg"}
                                        alt={selectedLessonData.lesson.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-lg font-semibold mb-2">Let's begin.</h3>
                                <p className="text-gray-700 mb-4">
                                    Meditation is a practice that can help us become more aware of our thoughts, feelings, and sensations in the present moment. For beginners, it's important to start with basic meditation techniques that can help them develop a foundation for their practice. Breath awareness, body scan, and loving kindness meditations are some great starting points. It's also essential to establish a regular practice schedule and create a dedicated space for meditation.
                                </p>

                                <div className="mt-6">
                                    <button className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700">
                                        Complete lesson
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-1">Select a lesson</h3>
                            <p className="text-gray-500">Choose a lesson from the sidebar to start learning</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
