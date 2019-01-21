::c:\Users\Public\xampp\php\php.exe composer.phar self-update
::c:\Users\Public\xampp\php\php.exe composer.phar update symfony/symfony --with-dependencies --prefer-dist -vvv
::c:\Users\Public\xampp\php\php.exe composer.phar install --with-dependencies --prefer-dist -vvv
::c:\Users\Public\xampp\php\php.exe bin/console doctrine:schema:update --dump-sql  --force
::c:\Users\Public\xampp\php\php.exe composer.phar create-project symfony/skeleton qz --prefer-dist -vvv
::c:\Users\Public\xampp\php\php.exe bin/console app:user-remove  >> logfile.log 
::c:\Users\Public\xampp\php\php.exe bin/console doctrine:fixtures:load
c:\Users\Public\xampp\php\php.exe composer.phar phpcs
echo OK?
pause 