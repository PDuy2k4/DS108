# DS108 UIT

## STEPS TO RUN FINAL PROJECT :

1. Clone the repository
2. Install NodeJS from [here](https://nodejs.org/en) and install Python from [here](https://www.python.org/getit/)
3. Install the requirements in the requirements.txt file
   `cd FinalProject/job-recommendation-be/`
   `pip install -r requirements.txt`
4. Install `lib` folder from [here](https://drive.google.com/drive/folders/1qOjldgoIWBpBj8kWrQcDIJcx3l2WlHbI?usp=drive_link)

5. Unzip and put the `lib` folder into the `job-recommendation-be` folder :

```bash
📂job-recommendation-be
┣ 📂lib
┣ 📂__pycache__
┣ 📂Data
┣ 📂ML_models
┣ 📂uploads
┣ 📜main.py
┗ 📜requirements.txt
```

6. Right click on the `job-recommendation-be` in VSCode folder and click `Open in  Intergrated Terminal` and run:

   ```pyton
       uvicorn main:app --host 127.0.0.1 --port 5000
   ```

   **Note**: If you see the following sentences in the terminal, you get a success:

   ```bash
       PC@DESKTOP-NACFJH0 MINGW64 /d/DS/DS108/Final Project/job-recommendation-be (main)
       $ uvicorn main:app --port=5000
       INFO:     Started server process [6448]
       INFO:     Waiting for application startup.
       INFO:     Application startup complete.
       INFO:     Uvicorn running on http://127.0.0.1:5000 (Press CTRL+C to quit)
   ```

7.Right click on the `job-recommendation-fe` in VSCode folder and click `Open in  Intergrated Terminal` and run:

```bash
    npm i
```

8.Once the packages have finished installing, you can run the following command in the same terminal to start the front end:

```bash
    npm run start
```
