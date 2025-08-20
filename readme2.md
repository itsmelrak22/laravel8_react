- Install Laragon


- Step 1: Add PHP 7.4 to Laragon
Navigate to Laragon's PHP directory:

Go to: C:\laragon\bin\php\

Create a new folder for PHP 7.4:

Create folder: php-7.4.x (you can name it exactly like this or php-7.4.33)
Step 2: Configure Laragon to Recognize the New PHP Version
Open Laragon → Click the Laragon icon

Go to Menu → Preferences → PHP

Click "Refresh" or restart Laragon completely

The new PHP 7.4 should now appear in the dropdown list

Select PHP 7.4 and click OK

Step 3: Restart Laragon Services
Click Laragon icon → Restart All

Step 4: Verify PHP Version
bash
php --version
You should see PHP 7.4.x in the output.

- install Laravel
composer create-project --prefer-dist laravel/laravel:^8.0 laravel8-react
- setup database, open laragon database menu and create a database e.g. laravel8_react
- Edit your .env file:

env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel8_react
DB_USERNAME=root
DB_PASSWORD=
- Install Laragon


- Step 1: Add PHP 7.4 to Laragon
Navigate to Laragon's PHP directory:

Go to: C:\laragon\bin\php\

Create a new folder for PHP 7.4:

Create folder: php-7.4.x (you can name it exactly like this or php-7.4.33)
Step 2: Configure Laragon to Recognize the New PHP Version
Open Laragon → Click the Laragon icon

Go to Menu → Preferences → PHP

Click "Refresh" or restart Laragon completely

The new PHP 7.4 should now appear in the dropdown list

Select PHP 7.4 and click OK

Step 3: Restart Laragon Services
Click Laragon icon → Restart All

Step 4: Verify PHP Version
bash
php --version
You should see PHP 7.4.x in the output.

- install Laravel
composer create-project --prefer-dist laravel/laravel:^8.0 laravel8-react
- setup database, open laragon database menu and create a database e.g. laravel8_react
- Edit your .env file: (usual setup has no password, you can leave it blank)

env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel8_react
DB_USERNAME=sail
DB_PASSWORD=password

 