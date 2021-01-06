
import { findMore } from './find-more';
// import { cutFilesToOnePath } from './cut-files';
// import { getFilesPath } from './utils/file-utils';


const start = () => {
    // const files = getFilesPath('E:\\迅雷下载\\字幕\\15500+字幕');
    // console.log('----files----', files);
    findMore('E:\\迅雷下载\\字幕\\所有字幕', 'E:\\迅雷下载\\字幕\\11500+字幕', 'E:\\迅雷下载\\字幕\\hebing\\');
    // cutFilesToOnePath('E:\\迅雷下载\\字幕\\15500+字幕', 'E:\\迅雷下载\\字幕\\所有字幕\\');
}

start();
