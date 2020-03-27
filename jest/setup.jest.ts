import * as chrome from 'sinon-chrome'


// @ts-ignore
global.chrome = chrome;
// @ts-ignore
global.browser = chrome;

chrome.runtime.id = "test_id";



