import { Optional } from "@nestjs/common";
import{IsString, Matches, IsEmail, IsNotEmpty, IsOptional} from "class-validator";
//import { Transform } from "class-transformer";
import { StudentEntity } from "./student.entity";

export class St_GuardianDTO{

    @Optional()
    id: number;

    @IsString()
    firstname:string;

    @IsString()
    lastname:string;

    @IsString()
    childname:string;

    @IsString()
    //regex for only alphabets
    @Matches(/^[a-zA-Z0-9._@]+$/, {
        message: 'Username should contain alphabets (A-Z or a-z), at least 1 numeric character and must contain @'
    })
    username: string;

    @IsString()
    @Matches(/.*@.*\.com/, {
        message: 'Email should contain @ and .com'
    })
    @IsNotEmpty({ message: 'Email address is required' })
    email: string;

    @IsString()
    @Matches(/^^01\d-\d{8}$/, 
    { message: 'Invalid phone number format. Phone number must match the pattern: 01X-XXXXXXXX' })
    
    phoneNo: string;

    @IsString()
    @Matches(/^(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'Password must contain at least one numeric character and a special character.'
    })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    filename: string;

    students: StudentEntity[];
}

export class loginDTO{
    @Optional()
    id: number;
    
    @IsString()
    //regex for only alphabets
    @Matches(/^[a-zA-Z0-9._@]+$/, {
        message: 'Username should contain alphabets (A-Z or a-z), at least 1 numeric character and must contain @'
    })
    username: string;

    @IsString()
    @Matches(/^(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'Password must contain at least one numeric character and a special character.'
    })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

}

export class updatePasswordDTO{
    @Optional()
    id: number;
    
    @IsString()
    //regex for only alphabets
    @Matches(/^[a-zA-Z0-9._@]+$/, {
        message: 'Username should contain alphabets (A-Z or a-z), at least 1 numeric character and must contain @'
    })
    username: string;
    
    @IsString()
    @Matches(/^(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'Password must contain at least one numeric character and a special character.'
    })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}

export class Student{
    @Optional()
    id: number;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsString()
    email: string;

    @IsString()
    phoneno: string;
}



export class Attendance{
    name: string
    fromDate: string;
    toDate: string;
    totalDaysPresent: number
    totalDaysAbsent: number
    NumberOfClasses: number
    AttendenceMarks: number
}

export class Grades{
    name:string;
    courseName:string;
    grade:string;
}

export class Performance{
    attendence:string;
    quizzes:string;
    lab_performance:string;
    midterms:string;
    classtasks:string;
    labexams:string;
    assignment:string;
}

export class PaymentFee{
    semester:string;
    course1:string;
    course2:string;
    course3:string;
    course4:string;
    credits:number;
    amount: number;
}

export class PTA{
    scheduleDate:Date;
    duration:number;
    facultyName:string;
    course:string;
}

export class cancelPTA{
    
    message:{"Meeting cancelled."};
}

export class LeaveRequest{
    @IsString()
    @IsNotEmpty()
    studentName: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

}

export class Notifications{
    message: {"You have no new notifications"};

}
