import { Optional } from "@nestjs/common";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export enum Gender{
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export class CreateStudentDTO {
    @IsNotEmpty({message: 'Full Name is required'})
    @IsString({message: 'Full Name must be a string'})
    fullName: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email must be valid'})
    email: string;

    @IsNotEmpty({message: 'Program is required'})
    @IsString({message: 'Program must be a string'})
    program: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string' })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
        'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit'
    })
    password: string;

    @IsNotEmpty({message: 'Father Name is required'})
    @IsString({message: 'Father Name must be a string'})
    fatherName: string;

    @IsNotEmpty({message: 'Gender is required'})
    @IsString({message: 'Gender must be a string'})
    @IsEnum(Gender, {message: 'Gender should be Male, Female or Other'})
    gender: Gender;

    @IsNotEmpty({message: 'Date of Birth is required'})
    @IsDateString({}, {message: 'Date of Birth must be a valid date'})
    dateOfBirth: Date;

    @IsNotEmpty({message: 'Address is required'})
    @IsString({message: 'Address must be a string'})
    address: string;

    @IsNotEmpty({message: 'Nationality is required'})
    @IsString({message: 'Nationality must be a string'})
    nationality: string;

    @IsNotEmpty({message: 'Religion is required'})
    @IsString({message: 'Religion must be a string'})
    religion: string;

    @IsNotEmpty({message: 'Blood Group is required'})
    @IsString({message: 'Blood Group must be a string'})
    @Matches(/^(A|B|AB|O)[+-]$/, { message: 'Invalid blood group format. Valid formats: A+, B-, AB+, O-' })
    bloodGroup: string;

    @IsNotEmpty({message: 'Phone number is required'})
    @Matches(/^(01)[0-9]{9}$/,{ message: 'Phone number must start with 01 and contain only numbers' })
    @MaxLength(11, {message: 'Phone number must not be longer than 11 digits'})
    phoneNumber: string;

    @IsNotEmpty({message: 'Admission Date is required'})
    @IsDateString({}, {message: 'Admission Date must be a valid date'})
    admissionDate: Date;

    @Optional()
    @Matches(/\.(jpg)$/i, { message: 'Profile picture must have a JPG extension' })
    profilePicture: string;
}

export class LoginStudentDTO{

}