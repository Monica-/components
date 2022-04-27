# languageSupport

In multilingual apps, allows the use in front end of PHP translation files like the ones used in laravel. This PHP code
can send the translation files in a json object or a script with js translations object and js function to use it in
front.

Then in js can be called the function **__l(file,key)**. It will return the translation for 'key' in file 'file'. If
it's not found, returns 'key'.

All this allows decoupling of front and back while working with translations the same way and keeping translation php
files in one place with the same format.

Made with vanilla php & js.

## With Laravel:

- Add *languageSupport.php* file to app/support.
- Add a language field to the users table.

- Then create a folder for translations in front-end under '*resources/lang*' (for example *vendor/vue*), then another
  folder inside for each language ( *en*, *es*...). In each language folder, add php files (for example '*errors.php*')
  with the same keys:

>     <?php
>
>         return [
>           'Login failed' => 'Error al iniciar sesión',
>           'Page does not exist' => 'La página no existe',
>          ];
If keys are, for example, in english, it's not necessary an english folder. If a key or a file is not found, then the
key is returned.

- In web.php add:

>      Route::get('/language', function () {
>     	    return	response()->streamDownload(function () {
>     				$data= languageSupport::jsObject('vendor/vue/'.auth()->user()->language);
>      				$function= languageSupport::jsFunction();
>       				echo "$function $data";
>      		});
>      });
This will send an object with all translations and the js function *__l(file,key)* to front.

- In wrapping blade (views/app.blade.php) add:

>
>
> `<script src="/language"></script>`

Now in front, if there was an *errors.php* in '*es*' folder and user had '*es*' language, when called **__l('errors','
Login failed')** the output would be **'Error al iniciar sesión'**.

If *languageSupport.php* is in a different folder, change its namespace and attribute *$basepath*. This attribute
defines the path to translations (*resources/lang* by default). Laravel's *resource_path()* can't be used because a
static attribute can't be initialized with a function call. It's static because static methods can only use static
attributes.

## TODO

- Allow parameters to complete parts of a translation (like numbers).
- Allow singular and plural depending on a number passed (like "day left|days left").

