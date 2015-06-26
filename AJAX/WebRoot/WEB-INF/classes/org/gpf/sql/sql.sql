-- 建表
DROP TABLE employee PURGE;
PURGE recyclebin;
CREATE TABLE employee(
	ID NUMBER(2),
	name VARCHAR2(20) NOT NULL UNIQUE,
	sex VARCHAR2(4) NOT NULL,
	job VARCHAR2(50) NOT NULL,
	CONSTRAINT pk_id PRIMARY KEY(ID),
	CONSTRAINT ck_emp_sex CHECK(sex IN('男','女'))
);
-- 设置序列，让id字段自动增长
DROP SEQUENCE myseq;
CREATE SEQUENCE myseq;

INSERT INTO employee(ID,name,sex,JOB) VALUES(myseq.nextval,'洪七公','男','丐帮帮主');
INSERT INTO employee(ID,name,sex,JOB) VALUES(myseq.nextval,'郭靖','男','武林盟主');
INSERT INTO employee(ID,name,sex,JOB) VALUES(myseq.nextval,'黄蓉','女','桃花岛岛主');
COMMIT;
SELECT * FROM employee;