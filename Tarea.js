var mysql = require('mysql');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    var q = url.parse(req.url, true);
    var datos = q.query;

    var accion = datos.accion;

    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Bd'

    });

    let sql = "";
    let parametros = [];
    let tabla = datos.tabla;

    if (tabla == "libros") {

        switch (accion) {
            case "insert":
                sql = "insert into tbl_registro_libros " +
                    "(N_libro, genero_literario, F_lanzamineto, N_autor )" +
                    "values (?,?,?,?)";
                parametros = [datos.nombre_libro,
                    datos.genero_literario,
                    datos.F_lanzamineto,
                    datos.N_autor
                ];

                break;

            case "select":
                sql = "select * from T_registro_libros";
                break;

            case "update":
                sql = "update T_registro_libros " +
                    " set N_libro = ?," +
                    "genero_literario = ?, " +
                    " F_lanzamineto = ? " +
                    "N_autor = ?"+
                    " where id_libro = ? ";

                
                parametros = [datos.nombre_libro,
                    datos.genero_literario,
                    datos.F_lanzamineto,
                    datos.N_autor,
                    datos.id_libro
                ];
                break;

            case "delete":
                sql = "delete from T_registro_libros  where id_libro =? ";

                parametros = [datos.id_libro];
                break;

            default:
                sql = "";
                break;
        }

    }

    if (tabla == "alumno") {

        switch (accion) {
            case "insert":
                sql = "insert into T_alumno " +
                    "(N_cuenta, nombre, apellido) " +
                    "values (?,?,?)";
                parametros = [datos.N_cuenta,
                    datos.nombre,
                    datos.apelido
                ];

                break;

            case "select":
                sql = "select * from tbl_alumno";
                break;

            case "update":
                sql = "update T_alumno " +
                    " set nombre = ?, " +
                    " apellido = ? " +
                    " where numero_cuenta = ? ";

             
                parametros = [datos.numero_cuenta,
                    datos.nombre,
                    datos.apelido,
                    datos.N_cuenta
                ];
                break;

            case "delete":
                sql = "delete from tbl_alumno  where N_cuenta =? ";


                parametros = [datos.N_cuenta];
                break;


            default:
                sql = "";
                break;
        }
    }
    if (tabla == "prestamo") {
        switch (accion) {
            case "insert":
                sql = "insert into tbl_prestamos " +
                    "( id_libro, numero_cuenta, fecha_prestamo)"+
                    "values (?,?,?)";
                    parametros = [datos.id_libro,
                        datos.N_cuenta,
                        datos.F_prestamo
                    ];
                    break;
                    
            case "select":
                sql = "select * from tbl_prestamos";
                break;
                
            case "update":
                sql = "update T_prestamos " +
                " set F_prestamo =? " +
                " where id_prestamo =? ";

                
                parametros = [datos.fecha_prestamo,
                    datos.id_libro
                ];
                break;
                
            case "delete":
                sql = "delete from T_prestamos  where id_prestamo =? ";
                
                
                parametros = [datos.id_prestamo];
                break;
                
            default:
                sql = "";
                break;
        }
    }
    if (sql != "") {
        con.connect(function (err) {
            if (err) {
                console.log(err);
            } else {
                con.query(sql, parametros, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.write(JSON.stringify(result));
                        res.end();
                    }
                });
            }

        });
    } else {

        let retorno = {
            mensaje: "metodo no encontrado"
        };

        res.write(JSON.stringify(retorno));
        res.end();
    }





}).listen(8000)