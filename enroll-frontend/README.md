
## Initial Setup  
  
* Install project dependencies:  
  
    **Do not use node v12.6.0 (it has a memory leak which causes `yarn start` to hang).**
  
	```bash  
	 bin/setup
	 ```  
* Create an `settings.json` at the root of the project from `settings.example.json`.  
  
* Populate `settings.json` with correct information relevant to your environment.  
  
### Running Inside Simulators  
  
Running a debugger (optional):  
  
```bash  
yarn debugger  
```  
  
For launching iOS, run:  
  
```bash  
yarn run ios  
```  
  
For launching Android, start a simulator or connect a real device and then run:  
  
```bash  
yarn run android  
```  
  
## Clearing Cache  
  
```bash  
bin/clean  
```
