# PHP_autoloader

Class files must be in a directory tree the same as namespaces.

### Example:

**In file classes/my_class.php**

```
namespace classes;
class My_class {}
```

**In file index.php**

```
require 'autoloader.php';
$myClass= new classes\My_class;
```
