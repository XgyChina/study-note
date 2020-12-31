import fs from 'fs';
import path from 'path';

/**
 * 传入一个文件路径，遍历路径下的文件和文件夹
 * @param {*} mypath
 */
const findFiles = (mypath: string) => {
    const files = fs.readdirSync(mypath); // 同步写法
    files.forEach((filename: string) => {
        // 获取当前文件的绝对路径
        const filedir = path.join(mypath, filename);
        findPath(filedir);
    });
};

/**
 * 判断路径是文件还是文件夹
 * @param {*} mypath
 */
const findPath = (mypath: string) => {
    const stats = fs.statSync(mypath);
    if (stats.isDirectory()) {
        findFiles(mypath);
    } else if (stats.isFile()) {
        console.log('====文件===', mypath);
    }
};

findFiles('C:\\Users\\xuguoyuan\\Desktop\\test');