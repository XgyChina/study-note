----*****----
----修改主键的类型----
----*****----
---- 1、删除主键约束键
DECLARE @PrimaryKeyName sysname = (
	SELECT
		name
	FROM
		sysobjects
	WHERE
		xtype = 'PK'
	AND parent_obj = object_id('表名')
)
IF @PrimaryKeyName IS NOT NULL
BEGIN

DECLARE @SQL_PK NVARCHAR (MAX) = 'alter table 表名 drop constraint ' + @PrimaryKeyName PRINT (@SQL_PK) EXEC sp_executesql @SQL_PK ;
END
GO
---- 2、修改主键类型
ALTER TABLE 表名 ALTER COLUMN [ID] VARCHAR(50) COLLATE Chinese_PRC_CI_AS NOT NULL 
GO
---- 3、重新设置主键约束
ALTER TABLE 表名 ADD CONSTRAINT [PK__test__3214EC276D9C4664] PRIMARY KEY ([ID])
GO