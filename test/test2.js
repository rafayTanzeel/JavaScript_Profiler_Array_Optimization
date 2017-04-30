var buff = new Array();
buff[1] = 35; //2 elements added
buff[2] = 46; //1 elements added
buff[6] = 34; //4 elements added
//Overall 7 elements added


var buff2 = new Array(5, 34, 42); //3 elements added
buff2.push(56); //1 elements added
buff2.start=24;
buff2.pop();
//Overall 4 elements added


var buff3 = new Array(5); //5 elements added
buff3.push(56); //1 elements added
buff3.start=24;
buff3.pop();
//Overall 6 elements added


var buff4 = new Array(15); //15 elements added
buff4.push({}); //Error elements added
//Overall Failed, not displayed