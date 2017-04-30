var dicts = {}; //fake array
dicts[2] = -76;

var dicts2 = {4 : 5, 5 : 5, 8 : 6}; //fake array
dicts2[4] = 34;

var dicts3 = {4 : 5, 5 : [6, 8 , 95], 8 : 6}; //fake array but internal array
dicts3[4] = 34; //Array size 6

var dicts4 = {36 : 44, 73 : 2, 86 : [85 , 12]}; //fake array but internal array
dicts4[86][200]=5; //Access 200th elements of array