var buff = [5, 7, 12, 46]; //4 elements added
buff[1] = 456;
buff.pop();
buff[3] = 82;
buff.push(56); //1 elements added
buff.extras = true;
buff.extras5 = true;
buff.end;
buff['rt'];
//Overall 5 elements added

var buff2 = [];
buff2[7] = 456; //8 elements added
buff2[3] = 82;
buff2.push(56); //1 elements added
buff2.start=24;
typeof buff2;
buff2.pop();
//Overall 9 elements added

//Reusing the variable again
buff = [5, 5]; //2 elements added
buff[2] = 456; //1 elements added
buff.pop();
buff[3] = 82; //1 elements added
//Overall 4 elements added

//Reusing the variable again
buff3 = [1]; //1 elements added
buff3.push(NaN); //Error elements added
//Overall Failed, not displayed

//Reusing the variable again
buff4 = [63, 67, 832, 35]; //4 elements added
//Overall 4 elements added, readonly
