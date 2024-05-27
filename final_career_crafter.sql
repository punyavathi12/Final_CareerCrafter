create database careercrafterdb;
use careercrafterdb;
	
create table users_table(

	user_id int primary key not null auto_increment,
	password varchar(50) not null,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(100) not null,
	phone_number char(10) not null
-- role enum("user","admin") not null
-- created_on timestamp default current_timestamp,
-- last_updated timestamp default current_timestamp,

)auto_increment=100;

ALTER TABLE users_table
ADD CONSTRAINT unique_email UNIQUE (email);

create table admins_table(
	admin_id int primary key not null auto_increment,
	password varchar(50) not null,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	email varchar(100) not null,
	phone_number char(10) not null
-- created_on timestamp default current_timestamp,
-- last_updated timestamp default current_timestamp,
)auto_increment=100;

ALTER TABLE admins_table
ADD CONSTRAINT unique_email UNIQUE (email);

create table job_listing_table(
job_id int primary key not null auto_increment,
job_title varchar(100) not null,
description text not null,
qualifications text not null,
application_instructions text not null,
-- about hiring process
created_by  int not null,
Created_on  timestamp not null default current_timestamp,
location varchar(100) not null, 
min_Salary decimal(15,2) not null,
max_salary decimal(15,2) not null,
Company_name varchar(100) not null,
-- constraint check_salary CHECK (min_salary < max_salary),
foreign key (created_by) references admins_table(admin_id) on update cascade on delete cascade
)auto_increment=1000;


create table resume_db(
resume_id int primary key not null auto_increment,
user_id int not null,
description text not null,
-- description about yourself
projects text,
Skills text,
Certifications text,
internships text,
work_experience text,
created_on timestamp default current_timestamp,
last_updated timestamp default current_timestamp,
-- resume file link blob
foreign key (user_id) references users_table(user_id) on update cascade on delete cascade

)auto_increment=200;

create table applications_table(
Application_id int primary key not null auto_increment,
job_id int not null,
-- resume_id int not null,

Applied_on timestamp not null default current_timestamp,
Updated_on timestamp not null default current_timestamp,
user_id int not null,
Status enum('Pending', 'Reviewed', 'Rejected') not null default 'Pending',
employer_id int not null,
-- useful for displaying any info about employer
-- resume-path blob
foreign key (job_id) references job_listing_table(job_id) on update cascade on delete cascade,
-- foreign key (resume_id) references job_listing_table(resume_id) on update cascade on delete cascade,
foreign key (user_id) references users_table(user_id) on update cascade on delete cascade,
foreign key (employer_id) references admins_table(admin_id) on update cascade on delete cascade
)auto_increment=500;

insert into admins_table(password,first_name,last_name,email,phone_number) 
values ("ram@123","ram","g","ramg@gmail.com","9988776644");

insert into admins_table(password,first_name,last_name,email,phone_number)  
values ("varun@123","varun","b","varunb@gmail.com","9988776655");

insert into admins_table(password,first_name,last_name,email,phone_number)  
values ("tej@123","tej","p","tej@gmail.com","9988765721");

insert into job_listing_table (
job_title ,description ,qualifications ,application_instructions ,created_by ,location ,
min_Salary ,max_salary,Company_name) 
values ("Assosiate Software Eng","role is software eng","BE/B.tech","none",100,"hyd",400000,600000,"CGI"),
("Software Eng","role is software eng","BE/B.tech","none",100,"hyd",450000,650000,"CGI"),
("Data Anaylst","role is Analyst","BE/B.tech","none",101,"hyd",420000,620000,"Delloitte");

insert into applications_table (job_id,user_id,employer_id) values (1000,101,107);
insert into applications_table (job_id,user_id,employer_id) values (1002,102,101);
insert into applications_table (job_id,user_id,Status,employer_id) values (1005,103,"Reviewed",107);
insert into applications_table (job_id,user_id,Status,employer_id) values (1039,103,"Reviewed",112);
insert into applications_table (job_id,user_id,Status,employer_id) values (1040,102,"pending",112);
insert into applications_table (job_id,user_id,Status,employer_id) values (1041,103,"Reviewed",112);

delete from applications_table where user_id=103;

insert into users_table values (101,"ram@123","ram","g","ramg@gmail.com","9988776644");
insert into users_table values (102,"raju@123","raju","n","raju@gmail.com","9988764627");
insert into users_table values (103,"balaji@123","balaji","p","balaji@gmail.com","9988764987");

alter table job_listing_table
add column job_status enum("open","closed") not null default "open",
 add column job_industry varchar(50) not null default "IT" after job_title;

 alter table job_listing_table
 ALTER COLUMN job_status DROP DEFAULT,
 ALTER COLUMN job_industry DROP DEFAULT;

 alter table resume_db
 add column resume_file_link text not null ;

 alter table resume_db
 ALTER COLUMN resume_file_link DROP DEFAULT;

insert into resume_db (user_id,description, projects, Skills,Certifications, internships, work_experience,resume_file_link)
values(101,"I am CSE graduate","amazon clone","Python, AWS","AWS","amazon","2 months as GET at amazon",
"file:///C:/Users/punya/Downloads/White%20Simple%20Student%20CV%20Resume.pdf");

insert into resume_db (user_id,description, projects, Skills,Certifications, internships, work_experience,resume_file_link)
values(102,"I am ECE graduate","smart trolley with automatic biling","Python, matlab","embedded system","embedded system","fresher",
"file:///C:/Users/punya/Downloads/White%20Simple%20Student%20CV%20Resume.pdf");

insert into resume_db (user_id,description, projects, Skills,Certifications, internships, work_experience,resume_file_link)
values(103,"I am CSE graduate","Plant Classification","Python, matlab","Deep Learning","AI","fresher",
"file:///C:/Users/punya/Downloads/White%20Simple%20Student%20CV%20Resume.pdf");

ALTER TABLE admins_table
MODIFY COLUMN password VARCHAR(100);

 select * from resume_db;
 select * from admins_table;
 select * from users_table;
 select * from applications_table;
 select * from job_listing_table;
 
 delete from admins_table where admin_id>109;
 delete from job_listing_table where job_id>1016;
 -- {"job_id":1015,"job_title":"mernstack","job_industry":"IT","description":"we are looking for experience candidates(0-1Year)","qualifications":"BE/B.tech","application_instructions":"none","created_by":101,"location":"chennai","min_salary":450000,"max_salary":650000,"company_name":"tcs","job_status":"open"}
 -- {"job_title":"Software Eng","job_industry":"IT","description":"we are looking for fresher","qualifications":"BE/B.tech","application_instructions":"none","created_by":101,"location":"hyd","min_salary":450000,"max_salary":650000,"company_name":"tcs","job_status":"closed"}
 -- {"admin_id":107,"email":"anup@gmail.com","password":"anup@123"}
 -- {"password":"anup@123","first_name":"anu","last_name":"p","email":"anup@gmail.com","phone_number":"9989776644"}