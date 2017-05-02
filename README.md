# JavaScript_Profiler_Array_Optimization
# Use Jalangi 2
https://github.com/Samsung/jalangi2

Note: Jalangi 2 framework not included in this repo, needs to be downloaded in order to make this work

#Requirement

git clone repo of jalangi2
make sure latest version of node.js is installed
install jalangi2 dependencies (npm install)
run jalangi2 python scripts as described at https://github.com/Samsung/jalangi2
python scripts/test.traceall.py
python scripts/test.analysis.py
python scripts/test.dlint.py


Here is how the project file should look like after installing jalangi2

#Project Files

project/
	analysis/ 
		directory contains the source code for the analysis
		
	jalangi2-master/ 
		directory is the repository from the github https://github.com/Samsung/jalangi2
		Note: (did not include in the submission due to the repository size exceeding 90 mb)
		
	test/ 
		contains the test files to test the analysis against
		
	benchmark/
		contains javascript code for benchmark of generic array vs typed array


To run the test.js analysis, run the command from the project directory

jalangi2-master/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis jalangi2-master/src/js/sample_analyses/ChainedAnalyses.js --analysis jalangi2-master/src/js/runtime/SMemory.js --analysis analysis/arrayTypeSpecific.js test/test.js

Just change the test.js to another test javascript file from the above command to run


To run benchmark
Just execute code in any browser to output result
