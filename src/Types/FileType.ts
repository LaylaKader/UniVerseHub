import { Key } from "react";


export interface IFile {
  _id: Key | null | undefined;
  uploadedBy: string;
  fileName: string;
  fileDescription: string;
  type: "question" | "note" | "lecture";
  fileUrl: string;
    courseId: string; // Ensure courseId is of type ObjectId
  courseName: string;
  fileSize: number;
  fileType: string;
  
}
 export interface CounselingFormData {
   selectDate: string | number | Date;
   TopicName: string;
   Duration: number;
   Description: string;
   imgSrc: string | null;
   CashAmount: number | null;
   dateTime: string;
   Type: "online" | "offline";
   MeetLink: string | null;
   StudyRoomNumber: string;
   isFree: boolean;
 }