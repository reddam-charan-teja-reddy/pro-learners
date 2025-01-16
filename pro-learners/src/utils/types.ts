export type CourseData = {
    title: string;
    description: string;
    courseCode: string;
}

export type CourseApiResponse = {
    data: CourseData[];
    userId: string;
}

