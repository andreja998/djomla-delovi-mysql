/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     1/22/2020 8:35:24 AM                         */
/*==============================================================*/


-- alter table CATEGORY_SUBCATEGORY 
--    drop foreign key FK_CATEGORY_RELATIONS_CATEGORY;

-- alter table CATEGORY_SUBCATEGORY 
--    drop foreign key FK_CATEGORY_RELATIONS_SUBCATEG;

-- alter table MODEL 
--    drop foreign key FK_MODEL_RELATIONS_MAKER;

-- alter table PART_CATEGORY_SUBCATEGORY 
--    drop foreign key FK_PART_CAT_RELATIONS_CATEGORY;

-- alter table PART_CATEGORY_SUBCATEGORY 
--    drop foreign key FK_PART_CAT_RELATIONS_PART;

-- alter table PART_CATEGORY_SUBCATEGORY 
--    drop foreign key FK_PART_CAT_RELATIONS_MODEL;

-- alter table PICTURE 
--    drop foreign key FK_PICTURE_RELATIONS_PART;

-- alter table ROLE 
--    drop foreign key FK_ROLE_RELATIONS_USER;

-- alter table USER 
--    drop foreign key FK_USER_RELATIONS_ROLE;

-- drop table if exists CATEGORY;


-- alter table CATEGORY_SUBCATEGORY 
--    drop foreign key FK_CATEGORY_RELATIONS_CATEGORY;

-- alter table CATEGORY_SUBCATEGORY 
--    drop foreign key FK_CATEGORY_RELATIONS_SUBCATEG;

-- drop table if exists CATEGORY_SUBCATEGORY;

-- drop table if exists MAKER;


-- alter table MODEL 
--    drop foreign key FK_MODEL_RELATIONS_MAKER;

-- drop table if exists MODEL;

-- drop table if exists PART;


-- alter table PART_CATEGORY_SUBCATEGORY 
--    drop foreign key FK_PART_CAT_RELATIONS_CATEGORY;

-- alter table PART_CATEGORY_SUBCATEGORY 
--    drop foreign key FK_PART_CAT_RELATIONS_PART;

-- alter table PART_CATEGORY_SUBCATEGORY 
--    drop foreign key FK_PART_CAT_RELATIONS_MODEL;

-- drop table if exists PART_CATEGORY_SUBCATEGORY;


-- alter table PICTURE 
--    drop foreign key FK_PICTURE_RELATIONS_PART;

-- drop table if exists PICTURE;


-- alter table ROLE 
--    drop foreign key FK_ROLE_RELATIONS_USER;

-- drop table if exists ROLE;

-- drop table if exists SUBCATEGORY;


-- alter table USER 
--    drop foreign key FK_USER_RELATIONS_ROLE;

-- drop table if exists USER;

/*==============================================================*/
/* Table: CATEGORY                                              */
/*==============================================================*/
create table CATEGORY
(
   CATEGORY_ID          int not null auto_increment comment '',
   CATEGORY_NAME        varchar(255) not null  comment '',
   primary key (CATEGORY_ID)
);

/*==============================================================*/
/* Table: CATEGORY_SUBCATEGORY                                  */
/*==============================================================*/
create table CATEGORY_SUBCATEGORY
(
   CATEGORY_SUBCATEGORY_ID int not null auto_increment comment '',
   SUBCATEGORY_ID       int  comment '',
   CATEGORY_ID          int  comment '',
   primary key (CATEGORY_SUBCATEGORY_ID)
);

/*==============================================================*/
/* Table: MAKER                                                 */
/*==============================================================*/
create table MAKER
(
   MAKER_ID             int not null auto_increment comment '',
   MAKER_NAME           varchar(255) not null  comment '',
   primary key (MAKER_ID)
);

/*==============================================================*/
/* Table: MODEL                                                 */
/*==============================================================*/
create table MODEL
(
   MODEL_ID             int not null auto_increment comment '',
   MAKER_ID             int not null  comment '',
   MODEL_NAME           varchar(255) not null  comment '',
   primary key (MODEL_ID)
);

/*==============================================================*/
/* Table: PART                                                  */
/*==============================================================*/
create table PART
(
   PART_ID              int not null auto_increment comment '',
   PART_NAME            varchar(255) not null  comment '',
   PART_PRICE           varchar(64) not null  comment '',
   PART_DESC            varchar(512) default NULL  comment '',
   QUANTITY             int not null comment '',
   primary key (PART_ID)
);

/*==============================================================*/
/* Table: PART_CATEGORY_SUBCATEGORY                             */
/*==============================================================*/
create table PART_CATEGORY_SUBCATEGORY
(
   P_C_SC_ID            int not null auto_increment comment '',
   PART_ID              int  comment '',
   MODEL_ID             int  comment '',
   CATEGORY_SUBCATEGORY_ID int  comment '',
   primary key (P_C_SC_ID)
);

/*==============================================================*/
/* Table: PICTURE                                               */
/*==============================================================*/
create table PICTURE
(
   PICTURE_ID           int not null auto_increment comment '',
   PART_ID              int not null  comment '',
   PICTURE_DEST         varchar(1024) not null  comment '',
   PICTURE_NAME         varchar(500) not null  comment '',
   primary key (PICTURE_ID)
);

/*==============================================================*/
/* Table: ROLE                                                  */
/*==============================================================*/
create table ROLE
(
   ROLE_ID              int not null auto_increment comment '',
   USER_ID              int  comment '',
   ROLE_NAME            varchar(20) not null  comment '',
   primary key (ROLE_ID)
);

/*==============================================================*/
/* Table: SUBCATEGORY                                           */
/*==============================================================*/
create table SUBCATEGORY
(
   SUBCATEGORY_ID       int not null auto_increment comment '',
   SUBCATEGORY_NAME     varchar(255) not null  comment '',
   primary key (SUBCATEGORY_ID)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   USER_ID              int not null auto_increment comment '',
   ROLE_ID              int  comment '',
   USERNAME             varchar(100) not null  comment '',
   PASSWORD             varchar(255) not null  comment '',
   primary key (USER_ID)
);

alter table CATEGORY_SUBCATEGORY add constraint FK_CATEGORY_RELATIONS_CATEGORY foreign key (CATEGORY_ID)
      references CATEGORY (CATEGORY_ID) on delete restrict on update restrict;

alter table CATEGORY_SUBCATEGORY add constraint FK_CATEGORY_RELATIONS_SUBCATEG foreign key (SUBCATEGORY_ID)
      references SUBCATEGORY (SUBCATEGORY_ID) on delete restrict on update restrict;

alter table MODEL add constraint FK_MODEL_RELATIONS_MAKER foreign key (MAKER_ID)
      references MAKER (MAKER_ID) on delete restrict on update restrict;

alter table PART_CATEGORY_SUBCATEGORY add constraint FK_PART_CAT_RELATIONS_CATEGORY foreign key (CATEGORY_SUBCATEGORY_ID)
      references CATEGORY_SUBCATEGORY (CATEGORY_SUBCATEGORY_ID) on delete restrict on update restrict;

alter table PART_CATEGORY_SUBCATEGORY add constraint FK_PART_CAT_RELATIONS_PART foreign key (PART_ID)
      references PART (PART_ID) on delete restrict on update restrict;

alter table PART_CATEGORY_SUBCATEGORY add constraint FK_PART_CAT_RELATIONS_MODEL foreign key (MODEL_ID)
      references MODEL (MODEL_ID) on delete restrict on update restrict;

alter table PICTURE add constraint FK_PICTURE_RELATIONS_PART foreign key (PART_ID)
      references PART (PART_ID) on delete restrict on update restrict;

alter table ROLE add constraint FK_ROLE_RELATIONS_USER foreign key (USER_ID)
      references USER (USER_ID) on delete restrict on update restrict;

alter table USER add constraint FK_USER_RELATIONS_ROLE foreign key (ROLE_ID)
      references ROLE (ROLE_ID) on delete restrict on update restrict;

