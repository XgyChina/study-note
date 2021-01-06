/**
 * 查找多出来的字幕
 */
import { getFilesPath, copyFileSync } from './utils/file-utils';
import path from 'path';
import readline from 'readline';

/**
 * 返回需要合并的字幕
 * @param path1 字幕基准问价夹
 * @param path2 字幕合并的文件夹
 * @param path3 需要合并的文件夹
 */
export const findMore = (path1: string, path2: string, path3: string): string[] => {
    const files1 = getFilesPath(path1);
    const files2 = getFilesPath(path2);
    console.log(`找到了${files1.length}个，找到了${files2.length}个`);
    console.log(`开始对比文件`);
    let res: string[] = [];
    let index = 0;
    files2.forEach((item: string) => {
        ++index;
        logProcess(index);
        if (!isHave(files1, item)) {
            res.push(item);
        }
    });
    console.log(res, '---res---');
    res.forEach((item: string) => {
        copyFileSync(item, `${path3}${path.basename(item)}`);
    })
    return res;
}

const logProcess = (index: number) => {
    readline.clearLine(process.stdout, 0);    //移动光标到行首
    readline.cursorTo(process.stdout, 0,0)
    process.stdout.write(`---${index}---`,'utf-8');
};

const isHave = (files: string[], file: string) => {
    const name1 = path.basename(file);
    return files.findIndex((p: string) => {
        const name2 = path.basename(p);
        return subExtra(name1) === subExtra(name2);
    }) > -1;
}

// /**
//  * 处理文件名，提取数字和字母
//  * @param p 全路径
//  */
// const getAvCard = (p: string) => {
//     let temp = path.basename(p);
//     temp = temp.replace(path.extname(temp), ''); // 去除后缀
//     return temp.match(/[a-zA-Z0-9\-]+/g) || []; // 提取车牌
// };

/**
 * 处理文件名，提取数字和字母
 * @param p 全路径
 */
const subExtra = (p: string) => {
    const extname = path.extname(p);
    return p.replace(extname, '').replace('-', '').replace('_', '').replace(/[^a-zA-Z\d]/g, '').toLocaleLowerCase();
};