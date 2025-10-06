<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>MathG API Documentation</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.style.css") }}" media="screen">
    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.print.css") }}" media="print">

    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>

    <link rel="stylesheet"
          href="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/obsidian.min.css">
    <script src="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jets/0.14.1/jets.min.js"></script>

    <style id="language-style">
        /* starts out as display none and is replaced with js later  */
                    body .content .bash-example code { display: none; }
                    body .content .javascript-example code { display: none; }
            </style>

    <script>
        var tryItOutBaseUrl = "http://gamepa.test";
        var useCsrf = Boolean();
        var csrfUrl = "/sanctum/csrf-cookie";
    </script>
    <script src="{{ asset("/vendor/scribe/js/tryitout-5.3.0.js") }}"></script>

    <script src="{{ asset("/vendor/scribe/js/theme-default-5.3.0.js") }}"></script>

</head>

<body data-languages="[&quot;bash&quot;,&quot;javascript&quot;]">

<a href="#" id="nav-button">
    <span>
        MENU
        <img src="{{ asset("/vendor/scribe/images/navbar.png") }}" alt="navbar-image"/>
    </span>
</a>
<div class="tocify-wrapper">
    
            <div class="lang-selector">
                                            <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                            <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                    </div>
    
    <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
    </div>

    <div id="toc">
                    <ul id="tocify-header-introduction" class="tocify-header">
                <li class="tocify-item level-1" data-unique="introduction">
                    <a href="#introduction">Introduction</a>
                </li>
                            </ul>
                    <ul id="tocify-header-authenticating-requests" class="tocify-header">
                <li class="tocify-item level-1" data-unique="authenticating-requests">
                    <a href="#authenticating-requests">Authenticating requests</a>
                </li>
                            </ul>
                    <ul id="tocify-header-endpoints" class="tocify-header">
                <li class="tocify-item level-1" data-unique="endpoints">
                    <a href="#endpoints">Endpoints</a>
                </li>
                                    <ul id="tocify-subheader-endpoints" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="endpoints-GETbroadcasting-auth">
                                <a href="#endpoints-GETbroadcasting-auth">Authenticate the request for channel access.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETup">
                                <a href="#endpoints-GETup">GET up</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GET-">
                                <a href="#endpoints-GET-">GET /</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgameplay-test--stageId-">
                                <a href="#endpoints-GETgameplay-test--stageId-">GET gameplay/test/{stageId}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETheroes-opciones">
                                <a href="#endpoints-GETheroes-opciones">GET heroes/opciones</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTheroes-seleccionar">
                                <a href="#endpoints-POSTheroes-seleccionar">POST heroes/seleccionar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgameplay-galaxia--galaxyId-">
                                <a href="#endpoints-GETgameplay-galaxia--galaxyId-">GET gameplay/galaxia/{galaxyId}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgameplay-lugar--stageId-">
                                <a href="#endpoints-GETgameplay-lugar--stageId-">GET gameplay/lugar/{stageId}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTgameplay-next-stage">
                                <a href="#endpoints-POSTgameplay-next-stage">POST gameplay/next-stage</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgameplay">
                                <a href="#endpoints-GETgameplay">GET gameplay</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTprofile-update-xp">
                                <a href="#endpoints-POSTprofile-update-xp">POST profile/update-xp</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsalas">
                                <a href="#endpoints-GETsalas">GET salas</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsalas-crear">
                                <a href="#endpoints-GETsalas-crear">GET salas/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTsalas">
                                <a href="#endpoints-POSTsalas">POST salas</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsalas--sala-">
                                <a href="#endpoints-GETsalas--sala-">GET salas/{sala}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsalas--sala--editar">
                                <a href="#endpoints-GETsalas--sala--editar">GET salas/{sala}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTsalas--sala-">
                                <a href="#endpoints-PUTsalas--sala-">PUT salas/{sala}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEsalas--sala-">
                                <a href="#endpoints-DELETEsalas--sala-">DELETE salas/{sala}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsalas-jugar--pin-">
                                <a href="#endpoints-GETsalas-jugar--pin-">GET salas/jugar/{pin}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETpanel">
                                <a href="#endpoints-GETpanel">GET panel</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETusers">
                                <a href="#endpoints-GETusers">GET users</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETusers-crear">
                                <a href="#endpoints-GETusers-crear">Show the form for creating a new resource.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTusers">
                                <a href="#endpoints-POSTusers">Store a newly created resource in storage.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETusers--id-">
                                <a href="#endpoints-GETusers--id-">GET users/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETusers--user--editar">
                                <a href="#endpoints-GETusers--user--editar">Show the form for editing the specified resource.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTusers--id-">
                                <a href="#endpoints-PUTusers--id-">Update the specified resource in storage.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEusers--id-">
                                <a href="#endpoints-DELETEusers--id-">Remove the specified resource from storage.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETdocentes">
                                <a href="#endpoints-GETdocentes">GET docentes</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTdocentes">
                                <a href="#endpoints-POSTdocentes">POST docentes</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTdocentes--docente-">
                                <a href="#endpoints-PUTdocentes--docente-">PUT docentes/{docente}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEdocentes--docente-">
                                <a href="#endpoints-DELETEdocentes--docente-">DELETE docentes/{docente}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTdocentes-bulk-destroy">
                                <a href="#endpoints-POSTdocentes-bulk-destroy">POST docentes/bulk-destroy</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgalaxias">
                                <a href="#endpoints-GETgalaxias">GET galaxias</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgalaxias-crear">
                                <a href="#endpoints-GETgalaxias-crear">GET galaxias/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTgalaxias">
                                <a href="#endpoints-POSTgalaxias">POST galaxias</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgalaxias--galaxia-">
                                <a href="#endpoints-GETgalaxias--galaxia-">GET galaxias/{galaxia}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETgalaxias--galaxia--editar">
                                <a href="#endpoints-GETgalaxias--galaxia--editar">GET galaxias/{galaxia}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTgalaxias--galaxia-">
                                <a href="#endpoints-PUTgalaxias--galaxia-">PUT galaxias/{galaxia}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEgalaxias--galaxia-">
                                <a href="#endpoints-DELETEgalaxias--galaxia-">DELETE galaxias/{galaxia}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETplanetas">
                                <a href="#endpoints-GETplanetas">GET planetas</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETplanetas-crear">
                                <a href="#endpoints-GETplanetas-crear">GET planetas/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTplanetas">
                                <a href="#endpoints-POSTplanetas">POST planetas</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETplanetas--planeta-">
                                <a href="#endpoints-GETplanetas--planeta-">GET planetas/{planeta}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETplanetas--planeta--editar">
                                <a href="#endpoints-GETplanetas--planeta--editar">GET planetas/{planeta}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTplanetas--planeta-">
                                <a href="#endpoints-PUTplanetas--planeta-">PUT planetas/{planeta}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEplanetas--planeta-">
                                <a href="#endpoints-DELETEplanetas--planeta-">DELETE planetas/{planeta}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETejercicios">
                                <a href="#endpoints-GETejercicios">GET ejercicios</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETejercicios-crear">
                                <a href="#endpoints-GETejercicios-crear">GET ejercicios/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTejercicios">
                                <a href="#endpoints-POSTejercicios">POST ejercicios</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETejercicios--ejercicio-">
                                <a href="#endpoints-GETejercicios--ejercicio-">GET ejercicios/{ejercicio}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETejercicios--ejercicio--editar">
                                <a href="#endpoints-GETejercicios--ejercicio--editar">GET ejercicios/{ejercicio}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTejercicios--ejercicio-">
                                <a href="#endpoints-PUTejercicios--ejercicio-">PUT ejercicios/{ejercicio}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEejercicios--ejercicio-">
                                <a href="#endpoints-DELETEejercicios--ejercicio-">DELETE ejercicios/{ejercicio}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETcartas">
                                <a href="#endpoints-GETcartas">GET cartas</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETcartas-crear">
                                <a href="#endpoints-GETcartas-crear">GET cartas/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTcartas">
                                <a href="#endpoints-POSTcartas">POST cartas</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETcartas--carta-">
                                <a href="#endpoints-GETcartas--carta-">GET cartas/{carta}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETcartas--carta--editar">
                                <a href="#endpoints-GETcartas--carta--editar">GET cartas/{carta}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTcartas--carta-">
                                <a href="#endpoints-PUTcartas--carta-">PUT cartas/{carta}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEcartas--carta-">
                                <a href="#endpoints-DELETEcartas--carta-">DELETE cartas/{carta}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTcartas--carta--ejercicios--ejercicio-">
                                <a href="#endpoints-POSTcartas--carta--ejercicios--ejercicio-">POST cartas/{carta}/ejercicios/{ejercicio}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEcartas--carta--ejercicios--ejercicio-">
                                <a href="#endpoints-DELETEcartas--carta--ejercicios--ejercicio-">DELETE cartas/{carta}/ejercicios/{ejercicio}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETpasos">
                                <a href="#endpoints-GETpasos">GET pasos</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETpasos-crear">
                                <a href="#endpoints-GETpasos-crear">GET pasos/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTpasos">
                                <a href="#endpoints-POSTpasos">POST pasos</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETpasos--paso-">
                                <a href="#endpoints-GETpasos--paso-">GET pasos/{paso}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETpasos--paso--editar">
                                <a href="#endpoints-GETpasos--paso--editar">GET pasos/{paso}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTpasos--paso-">
                                <a href="#endpoints-PUTpasos--paso-">PUT pasos/{paso}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEpasos--paso-">
                                <a href="#endpoints-DELETEpasos--paso-">DELETE pasos/{paso}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETopciones">
                                <a href="#endpoints-GETopciones">GET opciones</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETopciones-crear">
                                <a href="#endpoints-GETopciones-crear">GET opciones/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTopciones">
                                <a href="#endpoints-POSTopciones">POST opciones</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETopciones--opcione-">
                                <a href="#endpoints-GETopciones--opcione-">GET opciones/{opcione}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETopciones--opcione--editar">
                                <a href="#endpoints-GETopciones--opcione--editar">GET opciones/{opcione}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTopciones--opcione-">
                                <a href="#endpoints-PUTopciones--opcione-">PUT opciones/{opcione}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEopciones--opcione-">
                                <a href="#endpoints-DELETEopciones--opcione-">DELETE opciones/{opcione}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETenemigos">
                                <a href="#endpoints-GETenemigos">GET enemigos</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTenemigos">
                                <a href="#endpoints-POSTenemigos">POST enemigos</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTenemigos--enemigo-">
                                <a href="#endpoints-PUTenemigos--enemigo-">PUT enemigos/{enemigo}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEenemigos--enemigo-">
                                <a href="#endpoints-DELETEenemigos--enemigo-">DELETE enemigos/{enemigo}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETheroes">
                                <a href="#endpoints-GETheroes">GET heroes</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTheroes">
                                <a href="#endpoints-POSTheroes">POST heroes</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTheroes--id-">
                                <a href="#endpoints-PUTheroes--id-">PUT heroes/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEheroes--id-">
                                <a href="#endpoints-DELETEheroes--id-">DELETE heroes/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETlugares">
                                <a href="#endpoints-GETlugares">GET lugares</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETlugares-crear">
                                <a href="#endpoints-GETlugares-crear">GET lugares/crear</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTlugares">
                                <a href="#endpoints-POSTlugares">POST lugares</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETlugares--lugare-">
                                <a href="#endpoints-GETlugares--lugare-">GET lugares/{lugare}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETlugares--lugare--editar">
                                <a href="#endpoints-GETlugares--lugare--editar">GET lugares/{lugare}/editar</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTlugares--lugare-">
                                <a href="#endpoints-PUTlugares--lugare-">PUT lugares/{lugare}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETElugares--lugare-">
                                <a href="#endpoints-DELETElugares--lugare-">DELETE lugares/{lugare}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTlugares--stageId--puntos-vectoriales-sync">
                                <a href="#endpoints-POSTlugares--stageId--puntos-vectoriales-sync">POST lugares/{stageId}/puntos-vectoriales/sync</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsettings">
                                <a href="#endpoints-GETsettings">Invoke the controller method.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsettings-profile">
                                <a href="#endpoints-GETsettings-profile">Show the user's profile settings page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEsettings-profile">
                                <a href="#endpoints-DELETEsettings-profile">Delete the user's account.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsettings-password">
                                <a href="#endpoints-GETsettings-password">Show the user's password settings page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTsettings-password">
                                <a href="#endpoints-PUTsettings-password">Update the user's password.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETsettings-appearance">
                                <a href="#endpoints-GETsettings-appearance">GET settings/appearance</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETregister">
                                <a href="#endpoints-GETregister">Show the registration page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTregister">
                                <a href="#endpoints-POSTregister">Handle an incoming registration request.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETlogin">
                                <a href="#endpoints-GETlogin">Show the login page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTlogin">
                                <a href="#endpoints-POSTlogin">Handle an incoming authentication request.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETforgot-password">
                                <a href="#endpoints-GETforgot-password">Show the password reset link request page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTforgot-password">
                                <a href="#endpoints-POSTforgot-password">Handle an incoming password reset link request.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETreset-password--token-">
                                <a href="#endpoints-GETreset-password--token-">Show the password reset page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTreset-password">
                                <a href="#endpoints-POSTreset-password">Handle an incoming new password request.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETverify-email">
                                <a href="#endpoints-GETverify-email">Show the email verification prompt page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETverify-email--id---hash-">
                                <a href="#endpoints-GETverify-email--id---hash-">Mark the authenticated user's email address as verified.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTemail-verification-notification">
                                <a href="#endpoints-POSTemail-verification-notification">Send a new email verification notification.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETconfirm-password">
                                <a href="#endpoints-GETconfirm-password">Show the confirm password page.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTconfirm-password">
                                <a href="#endpoints-POSTconfirm-password">Confirm the user's password.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTlogout">
                                <a href="#endpoints-POSTlogout">Destroy an authenticated session.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETstorage--path-">
                                <a href="#endpoints-GETstorage--path-">GET storage/{path}</a>
                            </li>
                                                                        </ul>
                            </ul>
            </div>

    <ul class="toc-footer" id="toc-footer">
                    <li style="padding-bottom: 5px;"><a href="{{ route("scribe.postman") }}">View Postman collection</a></li>
                            <li style="padding-bottom: 5px;"><a href="{{ route("scribe.openapi") }}">View OpenAPI spec</a></li>
                <li><a href="http://github.com/knuckleswtf/scribe">Documentation powered by Scribe ✍</a></li>
    </ul>

    <ul class="toc-footer" id="last-updated">
        <li>Last updated: October 2, 2025</li>
    </ul>
</div>

<div class="page-wrapper">
    <div class="dark-box"></div>
    <div class="content">
        <h1 id="introduction">Introduction</h1>
<aside>
    <strong>Base URL</strong>: <code>http://gamepa.test</code>
</aside>
<pre><code>This documentation aims to provide all the information you need to work with our API.

&lt;aside&gt;As you scroll, you'll see code examples for working with the API in different programming languages in the dark area to the right (or as part of the content on mobile).
You can switch the language used with the tabs at the top right (or from the nav menu at the top left on mobile).&lt;/aside&gt;</code></pre>

        <h1 id="authenticating-requests">Authenticating requests</h1>
<p>This API is not authenticated.</p>

        <h1 id="endpoints">Endpoints</h1>

    

                                <h2 id="endpoints-GETbroadcasting-auth">Authenticate the request for channel access.</h2>

<p>
</p>



<span id="example-requests-GETbroadcasting-auth">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/broadcasting/auth" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/broadcasting/auth"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETbroadcasting-auth">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">content-type: text/html; charset=UTF-8
cache-control: no-cache, private
vary: X-Inertia
set-cookie: mathg_session=eyJpdiI6Ii9DWVVaWXhidUFUSWpnYWFjY09RT0E9PSIsInZhbHVlIjoieEx5OTBMd2Q0VTFGUDVRdXQrT3pET0EvNVArMDF0QmdhUkhDZmYzQU1qUmtYbmszMDRqNC8rM3FWdlVGS2lxTWRIazF6SzQxVGF6dlNKV2piMitGMlY5YUxUQVZQUGh0b2NPN2luRGFUdkNMTzZlZG9NMmVMVEVMUWNaWkZaWDMiLCJtYWMiOiI0YTNhYWZmZDk4MjdlNWQyZmJkNmY0NDJhNWNhMGI0N2E4MTc3ZjJjZDg4OTBjOTVjM2JjZTJkZmE2ZDk5MjViIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:35 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;"></code>
 </pre>
    </span>
<span id="execution-results-GETbroadcasting-auth" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETbroadcasting-auth"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETbroadcasting-auth"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETbroadcasting-auth" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETbroadcasting-auth">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETbroadcasting-auth" data-method="GET"
      data-path="broadcasting/auth"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETbroadcasting-auth', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETbroadcasting-auth"
                    onclick="tryItOut('GETbroadcasting-auth');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETbroadcasting-auth"
                    onclick="cancelTryOut('GETbroadcasting-auth');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETbroadcasting-auth"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>broadcasting/auth</code></b>
        </p>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>broadcasting/auth</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETbroadcasting-auth"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETbroadcasting-auth"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETup">GET up</h2>

<p>
</p>



<span id="example-requests-GETup">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/up" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/up"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETup">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

    &lt;title&gt;MathG&lt;/title&gt;

    &lt;!-- Fonts --&gt;
    &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.bunny.net&quot;&gt;
    &lt;link href=&quot;https://fonts.bunny.net/css?family=figtree:400,600&amp;display=swap&quot; rel=&quot;stylesheet&quot; /&gt;

    &lt;!-- Styles --&gt;
    &lt;script src=&quot;https://cdn.tailwindcss.com&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: [&#039;Figtree&#039;, &#039;ui-sans-serif&#039;, &#039;system-ui&#039;, &#039;sans-serif&#039;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;],
                    }
                }
            }
        }
    &lt;/script&gt;
&lt;/head&gt;
&lt;body class=&quot;antialiased&quot;&gt;
&lt;div class=&quot;relative flex justify-center items-center min-h-screen bg-gray-100 selection:bg-red-500 selection:text-white&quot;&gt;
    &lt;div class=&quot;w-full sm:w-3/4 xl:w-1/2 mx-auto p-6&quot;&gt;
        &lt;div class=&quot;px-6 py-4 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 flex items-center focus:outline focus:outline-2 focus:outline-red-500&quot;&gt;
            &lt;div class=&quot;relative flex h-3 w-3 group &quot;&gt;
                &lt;span class=&quot;animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 group-[.status-down]:bg-red-600 opacity-75&quot;&gt;&lt;/span&gt;
                &lt;span class=&quot;relative inline-flex rounded-full h-3 w-3 bg-green-400 group-[.status-down]:bg-red-600&quot;&gt;&lt;/span&gt;
            &lt;/div&gt;

            &lt;div class=&quot;ml-6&quot;&gt;
                &lt;h2 class=&quot;text-xl font-semibold text-gray-900&quot;&gt;Application up&lt;/h2&gt;

                &lt;p class=&quot;mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed&quot;&gt;
                    HTTP request received.

                                            Response rendered in 1227ms.
                                    &lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
 </pre>
    </span>
<span id="execution-results-GETup" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETup"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETup"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETup" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETup">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETup" data-method="GET"
      data-path="up"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETup', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETup"
                    onclick="tryItOut('GETup');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETup"
                    onclick="cancelTryOut('GETup');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETup"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>up</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETup"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETup"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GET-">GET /</h2>

<p>
</p>



<span id="example-requests-GET-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GET-">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6InZYR09pNDk2dUdyY2lsV3NkRFpoSkE9PSIsInZhbHVlIjoiaUhnak42VHc1a3E3YXFGdkQ0Z09XM1dDRFpzK2hSeGNPcjd4MjFKaUJrblpVVHpQRnJ1TkI4OTA2bU5PbVpzSVdRMXhGd0d4SitWSnc3aXgrVXZhelZUbXozdXoyN1EweGwzSFhvZlNXemhZQVhDNFFkdDZLNnhqRC9FbW93cnkiLCJtYWMiOiIwMTAwNDJiNGEwM2U5ZTM0YTFmNGRiOTYzNmQzNDgzNTNkZjEwYjE2ZDgxNGRkMjA1YWY0ZjEwZTFiZWM2Zjg4IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImYzdmVXcXF4SkFKWGIyNzZWOHJBdWc9PSIsInZhbHVlIjoiR3duNGx0ejBmcmpWMmlHbWtyZTFqcEVvY2ZqN0NNdHdWRnd4K0ljTXJldWtUQlRJSmFlY1FKUHcraWV0bXBaYVJRTzJybXgzS0p5VjBzZUNwV01ySEtIRVVBZmhxR1dkS2FhUkNzTFNsRTQrckdDOEhMQVJSQXJSejRnYlkrZXEiLCJtYWMiOiIwNWYyMDY1N2ExNDY4YTRkZTdiNWYwZDhiOWEzZTNkYmQxZWUzZmU4NTEyYjE3MWEwNzllMDMxYTU1ZjNmZDYwIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Server Error&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GET-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GET-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GET-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GET-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GET-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GET-" data-method="GET"
      data-path="/"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GET-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GET-"
                    onclick="tryItOut('GET-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GET-"
                    onclick="cancelTryOut('GET-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GET-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>/</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GET-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GET-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETgameplay-test--stageId-">GET gameplay/test/{stageId}</h2>

<p>
</p>



<span id="example-requests-GETgameplay-test--stageId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/gameplay/test/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/gameplay/test/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgameplay-test--stageId-">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6Ik5Vb2ozQTc2eHo5ekk5L1NCaGVBRVE9PSIsInZhbHVlIjoiVjFaRy80bDVxZHhkdEtmbHBDOGxwUEdLVEgrV2tlbWt3UXpZRE5DNzJvdGpaUFRobnZydVBzQUQ2RmVWSmpnUUdwaVNCTGMyc2pZKzFFOVFwUms3WERDMmhIdTdyN2xBbEhVV1BkTmRYQzB2eFBkRysxV0xCS0V0ZGNqMTg0d3oiLCJtYWMiOiI4MzRkY2NjMjE0ZWUwZjI5OTZmNGY1YzU3YzJjYTg0ZGYwODVlYWZhZmE1OGU0MmFjYTFiODA5NzYzMDcyNWIyIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InpMMi9kN1ZOUW9IaGc5VHFJcEVLdEE9PSIsInZhbHVlIjoia21sR0k5Z2pIcGFOOTdheXo3eXJHbUlJQmxiWjZ2Q1VFTFdyVC8zakhyWStKTllVVmwvMWpKdlBEN3RLRjRJdXUvQWU1WDhvYXVIMDV3RmcrbUhwNkNJcHZhZStPTUVORnNKTURyUys3Y082UENmdE9HaldsKzdjMmZDaHhFMDUiLCJtYWMiOiJlMGE0NTlmNWIyOGYyNGYyMzAyYjQyYzYyNGIwYmQ0Y2Q0NmQwMmJjNzgzMTQ4ZTVjOTdkOTRlZmU5N2E2MGFlIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Server Error&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgameplay-test--stageId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgameplay-test--stageId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgameplay-test--stageId-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgameplay-test--stageId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgameplay-test--stageId-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgameplay-test--stageId-" data-method="GET"
      data-path="gameplay/test/{stageId}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgameplay-test--stageId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgameplay-test--stageId-"
                    onclick="tryItOut('GETgameplay-test--stageId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgameplay-test--stageId-"
                    onclick="cancelTryOut('GETgameplay-test--stageId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgameplay-test--stageId-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>gameplay/test/{stageId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgameplay-test--stageId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgameplay-test--stageId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>stageId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="stageId"                data-endpoint="GETgameplay-test--stageId-"
               value="architecto"
               data-component="url">
    <br>
<p>Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETheroes-opciones">GET heroes/opciones</h2>

<p>
</p>



<span id="example-requests-GETheroes-opciones">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/heroes/opciones" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/heroes/opciones"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETheroes-opciones">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6InVzbHVhOGNnazAyTGxsb1diUDUxaEE9PSIsInZhbHVlIjoiZGZlNGhEWnhGQWFIQU1jZTZxVExTcUMwdXpQeGRVMU1Sb1FRSlhVcHRXUC9Qai84SmdxNTUvUlBCbUZ0T1VDdDB0N2g5MkEzRnV3ZjVHVTBmZkxkTkFpa0NmUlhjRy9iTS9ScG9hL1JtMnVPM0dZSjdZd1czSDZxSWtHakhEY0YiLCJtYWMiOiJkNjFkNGJmZGI5OThjYmJkZWViY2RkNWQ2MTgyNGRmOTI5ZmQzNGQ4NDA1NjhhODlhM2U0ZGY0N2ExMzY1YmI5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjZqL05ZMDVsbDh4SndjVTF4cnpiclE9PSIsInZhbHVlIjoiUjNoTFZXd3BTQXZPNzdDRWVGd1dPeXpuL2lMYnBqbkR5bHJOSXJ3bXUzeEJJeFY3ZCtkWlhTK3pHSWV0VG14c3U0dkJSZHhZZEg2RHJBc2xxTnY5a2d6SW9keGVybXdKVmN3ZkJTZ0w0R0NoMVBKNzlYNzBLUnp4Nkx5SktkV3IiLCJtYWMiOiI5OGFmOTk1MzM0MmRkMDk2ODgwZDM4NWUwZmYzMDJhZmU0ZTYwYjg2NjI0ODU4MGY2NjJmN2QxYWJlOTc2NDJiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETheroes-opciones" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETheroes-opciones"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETheroes-opciones"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETheroes-opciones" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETheroes-opciones">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETheroes-opciones" data-method="GET"
      data-path="heroes/opciones"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETheroes-opciones', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETheroes-opciones"
                    onclick="tryItOut('GETheroes-opciones');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETheroes-opciones"
                    onclick="cancelTryOut('GETheroes-opciones');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETheroes-opciones"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>heroes/opciones</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETheroes-opciones"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETheroes-opciones"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTheroes-seleccionar">POST heroes/seleccionar</h2>

<p>
</p>



<span id="example-requests-POSTheroes-seleccionar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/heroes/seleccionar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"id\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/heroes/seleccionar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "id": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTheroes-seleccionar">
</span>
<span id="execution-results-POSTheroes-seleccionar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTheroes-seleccionar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTheroes-seleccionar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTheroes-seleccionar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTheroes-seleccionar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTheroes-seleccionar" data-method="POST"
      data-path="heroes/seleccionar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTheroes-seleccionar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTheroes-seleccionar"
                    onclick="tryItOut('POSTheroes-seleccionar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTheroes-seleccionar"
                    onclick="cancelTryOut('POSTheroes-seleccionar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTheroes-seleccionar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>heroes/seleccionar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTheroes-seleccionar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTheroes-seleccionar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="POSTheroes-seleccionar"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the heroes table. Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETgameplay-galaxia--galaxyId-">GET gameplay/galaxia/{galaxyId}</h2>

<p>
</p>



<span id="example-requests-GETgameplay-galaxia--galaxyId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/gameplay/galaxia/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/gameplay/galaxia/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgameplay-galaxia--galaxyId-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImlBMjd2emlNUkd4S2ZOR1oyQzBxdUE9PSIsInZhbHVlIjoienQ2eGdnNDQzQlEyT0JOYTJVMnhZYWZ6bVd3UVJjaG96MHhIZzFDMTM1YWhCUmMwZVR0Z0VTektSWDdmcnd6WUZvb2QvTStEbk41VkoyKzRnKy9oaHlnYzVvVWNwNy9Ecmh1SFg3ek85VituS0NVZWNSci83ZGUvNjd4QmhVWmYiLCJtYWMiOiIxYjA2MGIyN2Y3MzA5ZGVlYzQ0YmJkODAwZjZkYjg2OThmNzAwN2ViNDI2OTMyYzI4N2MyODAwMDhhOWM0NDg1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImtqTjhqb2lJWUJPcktlMnpCWGFLR1E9PSIsInZhbHVlIjoiMUZZN3AyVFlaN0VjMC9wcWw0K2ZObVFDTU9YQTRxeTFEaWZjT3NUd3VZWjd0N0J5Nm1GR1dMb25HdlowWHpHN1dxbEtnVVNleGtWblZ6RUJGZ2hnUkRiNm5ieGIrVyt6cGJtOXc3Um5EWkJMK1dIeEFmRElYZGJEc1pxd0ZCVCsiLCJtYWMiOiJlMWE5OWNmZWE5YzlhZTNiOGExYzc2MWMxZjMxYmI2YWUzYTdmZGY0OTZmYzE2YjI4NzE5ZGMyYTI0YWY3YmE3IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgameplay-galaxia--galaxyId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgameplay-galaxia--galaxyId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgameplay-galaxia--galaxyId-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgameplay-galaxia--galaxyId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgameplay-galaxia--galaxyId-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgameplay-galaxia--galaxyId-" data-method="GET"
      data-path="gameplay/galaxia/{galaxyId}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgameplay-galaxia--galaxyId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgameplay-galaxia--galaxyId-"
                    onclick="tryItOut('GETgameplay-galaxia--galaxyId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgameplay-galaxia--galaxyId-"
                    onclick="cancelTryOut('GETgameplay-galaxia--galaxyId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgameplay-galaxia--galaxyId-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>gameplay/galaxia/{galaxyId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgameplay-galaxia--galaxyId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgameplay-galaxia--galaxyId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>galaxyId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="galaxyId"                data-endpoint="GETgameplay-galaxia--galaxyId-"
               value="architecto"
               data-component="url">
    <br>
<p>Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETgameplay-lugar--stageId-">GET gameplay/lugar/{stageId}</h2>

<p>
</p>



<span id="example-requests-GETgameplay-lugar--stageId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/gameplay/lugar/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/gameplay/lugar/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgameplay-lugar--stageId-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImRxRHZIMHI4VVNza2txWTNRMnpYSmc9PSIsInZhbHVlIjoiSStXZGJlNUpSKzRqeGY4ZXBnRlFLRTUvVHJVM2Zvbjh0MndHczArY0s2d0VRQ20zb1U1N0I2VFlrbkJnNVdaSkVyaUJTSWFKZ05hT2o5Qk80VUg4ekM3OThBcEhyUGVFUXY1Umx6Y0NhaTlkNHU4M0R3UlRIQkxiQ2UvS1M2UUwiLCJtYWMiOiJiNWFmZTAxYjI1Zjc5YmNhYWNlMjJhNjY1MmM5OWI5ZWJkYjA1NzU1ODgwYWQ1ZTZkM2ZlNjU3MmM5Mjc1ZjY1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImtxdVloMnNvU3lxL2hxdzJuTXcvRGc9PSIsInZhbHVlIjoiemVGN1JRRStmTjdwR0FvaEVHYXVja3FkdzM3RXpSa1hnWkg4QVJPR29UTE9UblNVYzdGWDRTK013bHlRcXp1a0ZUZVJ6KzdONDR4bHltWU1TTDFrc3pYUlF1eEpsVFZCSWNrWFYzQUVkUC9JbHRlQVRwM1UrM1lDM2luSWtvdzEiLCJtYWMiOiJhZWM3NTYyOWEzM2FiMWI2OWI3ODI4ZGZiNzRjZTczOThkYTZiY2FmOTMwYjlhMjJhZTM5YWZiMTQwYmI1MjVlIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgameplay-lugar--stageId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgameplay-lugar--stageId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgameplay-lugar--stageId-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgameplay-lugar--stageId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgameplay-lugar--stageId-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgameplay-lugar--stageId-" data-method="GET"
      data-path="gameplay/lugar/{stageId}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgameplay-lugar--stageId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgameplay-lugar--stageId-"
                    onclick="tryItOut('GETgameplay-lugar--stageId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgameplay-lugar--stageId-"
                    onclick="cancelTryOut('GETgameplay-lugar--stageId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgameplay-lugar--stageId-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>gameplay/lugar/{stageId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgameplay-lugar--stageId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgameplay-lugar--stageId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>stageId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="stageId"                data-endpoint="GETgameplay-lugar--stageId-"
               value="architecto"
               data-component="url">
    <br>
<p>Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTgameplay-next-stage">POST gameplay/next-stage</h2>

<p>
</p>



<span id="example-requests-POSTgameplay-next-stage">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/gameplay/next-stage" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/gameplay/next-stage"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTgameplay-next-stage">
</span>
<span id="execution-results-POSTgameplay-next-stage" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTgameplay-next-stage"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTgameplay-next-stage"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTgameplay-next-stage" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTgameplay-next-stage">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTgameplay-next-stage" data-method="POST"
      data-path="gameplay/next-stage"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTgameplay-next-stage', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTgameplay-next-stage"
                    onclick="tryItOut('POSTgameplay-next-stage');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTgameplay-next-stage"
                    onclick="cancelTryOut('POSTgameplay-next-stage');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTgameplay-next-stage"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>gameplay/next-stage</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTgameplay-next-stage"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTgameplay-next-stage"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETgameplay">GET gameplay</h2>

<p>
</p>



<span id="example-requests-GETgameplay">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/gameplay" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/gameplay"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgameplay">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkZyVktSS2VPRHN3L2JaS3lIYmQ1THc9PSIsInZhbHVlIjoiampCUGdnMk5QYXE1UzYrU3FnelBraDdmbnNqNTBraFdaVmQ0N29ZL1ZuS2pVeHdHWHdJVWRnR2ZhRVJtOUlDcUIzcHdINVlXcHloZ3dDU212Nm5RVDFYeTRtR1JSZ1luWkRTYStxMHpHQ3JXV2Y4S3JQRmhpdlIrTTlBMHFjWGUiLCJtYWMiOiIwODdjNGUwYmQxMjliYzY3MGQ3YmUzNzRlMDY1MDM0MTYzMTI4M2Y5N2ZiNDExNzIxNzlhZmQ0NWZkMGRiMzNmIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IkZrVnBWU0I2WkVoRkUycWxtU0hvUWc9PSIsInZhbHVlIjoickw2MURCVnBaUndLWTlPRldXaGFIN0pYZktvVjJGcksyOTZiVzdSS0tXTC96TUozeFhKNWxMQmdRejhwMXVGSU5pdno2U1FCTEY1S1VMQ1lURnAxTW84eHZUMXVmUmdMcXN4U1UyQ21ZOG0xVmM5S2JqTm5zUXNHZDhoWThFUksiLCJtYWMiOiI1NzU4NTYzYmY5NDYyNDZlM2QwOWE5NzY2ZWVmOTkwNzZkMzc0ZGE3MDIzNWUzZjhhYWY2YzY3NDYwMWJkYzA0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgameplay" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgameplay"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgameplay"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgameplay" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgameplay">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgameplay" data-method="GET"
      data-path="gameplay"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgameplay', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgameplay"
                    onclick="tryItOut('GETgameplay');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgameplay"
                    onclick="cancelTryOut('GETgameplay');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgameplay"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>gameplay</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgameplay"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgameplay"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTprofile-update-xp">POST profile/update-xp</h2>

<p>
</p>



<span id="example-requests-POSTprofile-update-xp">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/profile/update-xp" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"total_xp\": 27
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/profile/update-xp"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "total_xp": 27
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTprofile-update-xp">
</span>
<span id="execution-results-POSTprofile-update-xp" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTprofile-update-xp"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTprofile-update-xp"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTprofile-update-xp" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTprofile-update-xp">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTprofile-update-xp" data-method="POST"
      data-path="profile/update-xp"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTprofile-update-xp', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTprofile-update-xp"
                    onclick="tryItOut('POSTprofile-update-xp');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTprofile-update-xp"
                    onclick="cancelTryOut('POSTprofile-update-xp');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTprofile-update-xp"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>profile/update-xp</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTprofile-update-xp"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTprofile-update-xp"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>total_xp</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="total_xp"                data-endpoint="POSTprofile-update-xp"
               value="27"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>27</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETsalas">GET salas</h2>

<p>
</p>



<span id="example-requests-GETsalas">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/salas" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsalas">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkZUWS9xZG1kdFY0UloxR1ppN3NlQnc9PSIsInZhbHVlIjoiendkdDVuNXdJRU8vcFVVbll1STNnQzdmRDJ3OFoybk9mZk5oU1dVVnVEY1NFMEQrOWJlT3ZXZDI4Sk1nOGlRNHJGVC9rSkQrZktYcUQyY1F0ZWh4SXJKekRXUzcyL2JVSjhWRTN3ODZKTjZjWFZ4cUcvR3ZPOENRNVMvK2IyQlkiLCJtYWMiOiJiZTc5MTM4MDhkYjU0MThlMzU3ZGM1Y2EyOGRmMGY4N2M3OWE5MjQ4YzNmNDYzNWQ1ZDk5OTljNGYyYTdhYzdhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IkdFaEJTaHhtV3l6ck1mRm9vVWdHa2c9PSIsInZhbHVlIjoiNFZJUU5vNmk0MDlScFo4cXN3L2xqR2VZbjU0WDU4ajNRbzBzTWZOSmZ2VkJUKyswMG5qaVZGc0xVdkZ2UFUxYVhiYkNiOGljNmFQWjV3ZWhVaDY0NU5wdElpR2Z4KzFYVGNjQm9QMy9yQVBabmRMS21qNWdJVkFONWhZbFIxZlEiLCJtYWMiOiIxZjA0NjI5ZTBmYzc2MjI3MGE3ZjU0M2UxMTI0NjE3YmJlMWVhYjRkNDBlYzgzYWQxOGQ5YzUxMTFmYTZiOWNhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsalas" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsalas"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsalas"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsalas" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsalas">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsalas" data-method="GET"
      data-path="salas"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsalas', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsalas"
                    onclick="tryItOut('GETsalas');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsalas"
                    onclick="cancelTryOut('GETsalas');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsalas"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>salas</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsalas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsalas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETsalas-crear">GET salas/crear</h2>

<p>
</p>



<span id="example-requests-GETsalas-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/salas/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsalas-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImNLS1hkT2M5bmlSVWo4azFOM3hYTGc9PSIsInZhbHVlIjoiTHpPRjhoemp1bDd3SXlwVWpVK29udm9IZmJnSWVMMWw1S0ZYaklOQWJvMVQ2S2IvMHR6SDRQaHA3N1pLcWE3RXcwTUVTLy8zcUd1RE82WmxRREttUEh1TDV5MjF6QVpOaFA4cnE4SFNST3Brbm1TYnM0dy9ZOVowTFlDVkFPWEMiLCJtYWMiOiI2YmNjZTJkMGUzNjZmNzRiNDM5YjFmNDVjN2ZiYjY1YWFhNjc0MTQ4MTE2ZGM5M2IxM2RmNzA3NzAxYTZiNThkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InNNSWMxN2J0cUpHbUZXK3pBSFR0MkE9PSIsInZhbHVlIjoiRVNZbFk1Z3NZSGZSYTlXdXZ3ZHRsdFY2L0Z6Y2FUbW1DeGg0dFV2bEZYNEdtVFd0dzI2YUwxTWZQdkkvaWFMNWNLZ3FVQ21HckxLZ3FhVkpUWTRIRHR4R0krWDhwMnlwNVo1MWR2eXFyU0ZQTG9jaWJQRStTb3YxbFJmbkl2a2kiLCJtYWMiOiI0ZTQyMTc2YWIxOTIxNzk4NWRiNzM1N2E3MmE2MjJlNTMwZGE5Y2YyZjY4YWMyNjljMzgyMGViMTg4ZTJmZWQxIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsalas-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsalas-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsalas-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsalas-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsalas-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsalas-crear" data-method="GET"
      data-path="salas/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsalas-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsalas-crear"
                    onclick="tryItOut('GETsalas-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsalas-crear"
                    onclick="cancelTryOut('GETsalas-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsalas-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>salas/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsalas-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsalas-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTsalas">POST salas</h2>

<p>
</p>



<span id="example-requests-POSTsalas">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/salas" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"pin\": \"ngzmiy\",
    \"questions\": [
        {
            \"text\": \"b\",
            \"answers\": [
                {
                    \"text\": \"b\",
                    \"is_correct\": true
                }
            ]
        }
    ]
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "pin": "ngzmiy",
    "questions": [
        {
            "text": "b",
            "answers": [
                {
                    "text": "b",
                    "is_correct": true
                }
            ]
        }
    ]
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTsalas">
</span>
<span id="execution-results-POSTsalas" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTsalas"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTsalas"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTsalas" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTsalas">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTsalas" data-method="POST"
      data-path="salas"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTsalas', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTsalas"
                    onclick="tryItOut('POSTsalas');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTsalas"
                    onclick="cancelTryOut('POSTsalas');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTsalas"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>salas</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTsalas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTsalas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTsalas"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>pin</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="pin"                data-endpoint="POSTsalas"
               value="ngzmiy"
               data-component="body">
    <br>
<p>Must be 6 characters. Example: <code>ngzmiy</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>questions</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
<br>
<p>Must have at least 1 items.</p>
            </summary>
                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>text</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="questions.0.text"                data-endpoint="POSTsalas"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 1000 characters. Example: <code>b</code></p>
                    </div>
                                                                <div style=" margin-left: 14px; clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>answers</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
<br>
<p>Must contain 4 items.</p>
            </summary>
                                                <div style="margin-left: 28px; clear: unset;">
                        <b style="line-height: 2;"><code>text</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="questions.0.answers.0.text"                data-endpoint="POSTsalas"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 500 characters. Example: <code>b</code></p>
                    </div>
                                                                <div style="margin-left: 28px; clear: unset;">
                        <b style="line-height: 2;"><code>is_correct</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
 &nbsp;
                <label data-endpoint="POSTsalas" style="display: none">
            <input type="radio" name="questions.0.answers.0.is_correct"
                   value="true"
                   data-endpoint="POSTsalas"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="POSTsalas" style="display: none">
            <input type="radio" name="questions.0.answers.0.is_correct"
                   value="false"
                   data-endpoint="POSTsalas"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>true</code></p>
                    </div>
                                    </details>
        </div>
                                        </details>
        </div>
        </form>

                    <h2 id="endpoints-GETsalas--sala-">GET salas/{sala}</h2>

<p>
</p>



<span id="example-requests-GETsalas--sala-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/salas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsalas--sala-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlRzbU43T1JHemZOcmgycEQ0R3lyNUE9PSIsInZhbHVlIjoiVXRRRXNRSFR1Wm5jaWROWmNWbFhOdnlRbUhGeEdockdxVlhSVVVCL1AvOVhSYUNmTE1ZT2FINTF4eTk2VmNHNWUxd3hnSnFQb0dlNGNydGo3WlovNzRxaVozRVhaSXlRaGl1bEg4V2FFeEh1ZHdvUjYyNCtOUGZYS0dOZ20rZmsiLCJtYWMiOiI0ZTU4ODA1MGU2NzBiYjRjYmYwZDc0ZDU5NGMzMzRlMDBkODkwNjdmZmFjNDU5NmIzOTJhMGZjYjI3NmJiMmE2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImtHeDUzbFFVZGhEeTNEVUlqNXQ4a0E9PSIsInZhbHVlIjoiakRhRHg2QkNxS09Nc3Z4YnN3TWQ4WkZDR1huVnVvTXhKRFFkUHFEYjNSQnV6bWlnK1B3MmtmbDJVVjNlbXc1MHhRdHBJd1h2bUR3MlU4WjVIQnlDeWVKUTRBV2FRZGhKYmdwYWY3MkY4Szd0ZmxEcjh1cVJKS1dJdTRVMnRZR1ciLCJtYWMiOiI3ZWQzYzA2YTllNjlhZGU5ZTg1YTYyMWZmOThjNWExM2Q2M2UzMWExZDY5NzUyNjkzMWNhZjU1MWI5NWJmYWJkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsalas--sala-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsalas--sala-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsalas--sala-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsalas--sala-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsalas--sala-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsalas--sala-" data-method="GET"
      data-path="salas/{sala}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsalas--sala-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsalas--sala-"
                    onclick="tryItOut('GETsalas--sala-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsalas--sala-"
                    onclick="cancelTryOut('GETsalas--sala-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsalas--sala-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>salas/{sala}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsalas--sala-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsalas--sala-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>sala</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="sala"                data-endpoint="GETsalas--sala-"
               value="architecto"
               data-component="url">
    <br>
<p>The sala. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETsalas--sala--editar">GET salas/{sala}/editar</h2>

<p>
</p>



<span id="example-requests-GETsalas--sala--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/salas/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsalas--sala--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IjhUUTZZOUx3Vm41S2daQmFZcVA3TWc9PSIsInZhbHVlIjoiVEZ0VzdJaXJUaGdyTmtoM3pqZjhzL3BBRE42Q3U1dnNxZ21KSWdOT1hnRE10ZVUxVHZEZDY5NFBUSzFKTnlwL3NxbU9aOW9OMHdQaS91MkgzZWRGbStZK2t6VXJNTTZtN0FTMUZ3Q0svNlRlbDY1aUxtVEdOOTFPMzBhZ09WaFEiLCJtYWMiOiIwMmY4MDIyNzYwOWIzYzBhOWJlNWZlZTMyNTk5ZTcyYTk3ODI5MmMxYmJkOTYyYzhkOTM0MGFjZGFiYjgwMGVkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Imo4UG9Fand0NEYwc1pabXlVOSs1MVE9PSIsInZhbHVlIjoiZ2kzS1Y1TFpwTkNQMVo0NFllQzlyci8vQllmaU1LYkVnUk12ZnRlMkU0TWV4aGc5NGhyZkRUZ0lLK3l5ajl6aW9RM1JhKzVVSWhhQUYya1ZYVmhkYlZRWGd6dHhaMExIUVl0VGlrcTBBUTJiekM2eGdNMnFUb0ZJZ09kZzBvcXUiLCJtYWMiOiJiZjdmZDE5YjliZWNiYzYwYjE0NGEwNjIyOTRhMmZiZDAwNGM4NGIyOWI2MjZmOTBhYjE5ZjAzOWRjMzkwYTdiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsalas--sala--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsalas--sala--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsalas--sala--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsalas--sala--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsalas--sala--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsalas--sala--editar" data-method="GET"
      data-path="salas/{sala}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsalas--sala--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsalas--sala--editar"
                    onclick="tryItOut('GETsalas--sala--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsalas--sala--editar"
                    onclick="cancelTryOut('GETsalas--sala--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsalas--sala--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>salas/{sala}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsalas--sala--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsalas--sala--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>sala</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="sala"                data-endpoint="GETsalas--sala--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The sala. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTsalas--sala-">PUT salas/{sala}</h2>

<p>
</p>



<span id="example-requests-PUTsalas--sala-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/salas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"questions\": [
        {
            \"text\": \"b\",
            \"answers\": [
                {
                    \"text\": \"b\",
                    \"is_correct\": true
                }
            ]
        }
    ]
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "questions": [
        {
            "text": "b",
            "answers": [
                {
                    "text": "b",
                    "is_correct": true
                }
            ]
        }
    ]
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTsalas--sala-">
</span>
<span id="execution-results-PUTsalas--sala-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTsalas--sala-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTsalas--sala-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTsalas--sala-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTsalas--sala-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTsalas--sala-" data-method="PUT"
      data-path="salas/{sala}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTsalas--sala-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTsalas--sala-"
                    onclick="tryItOut('PUTsalas--sala-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTsalas--sala-"
                    onclick="cancelTryOut('PUTsalas--sala-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTsalas--sala-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>salas/{sala}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>salas/{sala}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTsalas--sala-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTsalas--sala-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>sala</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="sala"                data-endpoint="PUTsalas--sala-"
               value="architecto"
               data-component="url">
    <br>
<p>The sala. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTsalas--sala-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>questions</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
<br>
<p>Must have at least 1 items.</p>
            </summary>
                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>text</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="questions.0.text"                data-endpoint="PUTsalas--sala-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 1000 characters. Example: <code>b</code></p>
                    </div>
                                                                <div style=" margin-left: 14px; clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>answers</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
<br>
<p>Must contain 4 items.</p>
            </summary>
                                                <div style="margin-left: 28px; clear: unset;">
                        <b style="line-height: 2;"><code>text</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="questions.0.answers.0.text"                data-endpoint="PUTsalas--sala-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 500 characters. Example: <code>b</code></p>
                    </div>
                                                                <div style="margin-left: 28px; clear: unset;">
                        <b style="line-height: 2;"><code>is_correct</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
 &nbsp;
                <label data-endpoint="PUTsalas--sala-" style="display: none">
            <input type="radio" name="questions.0.answers.0.is_correct"
                   value="true"
                   data-endpoint="PUTsalas--sala-"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="PUTsalas--sala-" style="display: none">
            <input type="radio" name="questions.0.answers.0.is_correct"
                   value="false"
                   data-endpoint="PUTsalas--sala-"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>true</code></p>
                    </div>
                                    </details>
        </div>
                                        </details>
        </div>
        </form>

                    <h2 id="endpoints-DELETEsalas--sala-">DELETE salas/{sala}</h2>

<p>
</p>



<span id="example-requests-DELETEsalas--sala-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/salas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEsalas--sala-">
</span>
<span id="execution-results-DELETEsalas--sala-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEsalas--sala-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEsalas--sala-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEsalas--sala-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEsalas--sala-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEsalas--sala-" data-method="DELETE"
      data-path="salas/{sala}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEsalas--sala-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEsalas--sala-"
                    onclick="tryItOut('DELETEsalas--sala-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEsalas--sala-"
                    onclick="cancelTryOut('DELETEsalas--sala-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEsalas--sala-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>salas/{sala}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEsalas--sala-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEsalas--sala-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>sala</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="sala"                data-endpoint="DELETEsalas--sala-"
               value="architecto"
               data-component="url">
    <br>
<p>The sala. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETsalas-jugar--pin-">GET salas/jugar/{pin}</h2>

<p>
</p>



<span id="example-requests-GETsalas-jugar--pin-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/salas/jugar/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/salas/jugar/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsalas-jugar--pin-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6Im1HeG52bGEwemNVRDh2TVJXUERTclE9PSIsInZhbHVlIjoiR084R0R5UFlaY3R1UWFGa29oeXNYRnpnQnhuVVYvSUhVWkU2U1BRS1hzb1RmM1JoSXZqdXorQlpHV0Zhd1NxNFFyRm44bFp1RU5JbHB3VjVMN1B1R2VweHpOTjlHaGh6TzdleTZURHhRV0t2ZzFuMFQvbXE0VlhPSGN2YWs5UWkiLCJtYWMiOiI2ODc5OTUzMDExNGJkMDQ0ZWRhNzBkMzc1ZWNlZDA3NWU3M2YxYzhiODc1Mjc0ZGMzZGE2NmJmYzIyY2Y0NTljIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImJxbFBSbXM3Ry83Q1JaSEFmQTdEenc9PSIsInZhbHVlIjoicDJ3dytnYnNJUGdLY2N0Z1BsOXk0WG9GYWFVMUc0aENTOHR3djdONGlVR292ZXQrdGhaQlhhVTdTM280bFVhNlNUeFJ1M3NEOVdYM3JydXB1ME9qekNHdmg1Z2RQOHZVREdrN1lFTS83TXc0UnA0NGtJUE9LME9VdzlGeW9wVmIiLCJtYWMiOiIwN2FlZjY0N2IyMTE4ZDFkMTI3MDY5ZDVhMTM0OWQ4MDA5NDIxOWJkZTk4ZjYzZTJhYTQ1NjI1YzMzODVlODc3IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsalas-jugar--pin-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsalas-jugar--pin-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsalas-jugar--pin-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsalas-jugar--pin-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsalas-jugar--pin-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsalas-jugar--pin-" data-method="GET"
      data-path="salas/jugar/{pin}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsalas-jugar--pin-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsalas-jugar--pin-"
                    onclick="tryItOut('GETsalas-jugar--pin-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsalas-jugar--pin-"
                    onclick="cancelTryOut('GETsalas-jugar--pin-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsalas-jugar--pin-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>salas/jugar/{pin}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsalas-jugar--pin-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsalas-jugar--pin-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>pin</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="pin"                data-endpoint="GETsalas-jugar--pin-"
               value="architecto"
               data-component="url">
    <br>
<p>Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETpanel">GET panel</h2>

<p>
</p>



<span id="example-requests-GETpanel">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/panel" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/panel"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETpanel">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IjZqV0dwR0ZOcjYrZHc1emNrUnB3VkE9PSIsInZhbHVlIjoiRzZBb0NBRDRqZDZKQ3hHRG9PTWg0YXFnR1piTkIyVmVRR1RzZEZuM25TN1c5TXJ3Ni9LbE1zeGkwK2NzNmRlTDlyT2xab2crT0R4NU9CeVlNcVBpSXhkYmlzaDZCRGd5UThHVlZ4dENBUzAyUzJwWFBPTWdsQkVMT3p5M3pRcEciLCJtYWMiOiJlM2E5NmNkNmRjMmQ4ODA1MTNiZjVhYWJmZTMzOTQxZmQwZWU0N2ZjMWU2YWI2NTYwZDRjODI4MDFkNTNmMTBkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IkFPL2VCZGtuMGQ0VEUzUmRpbjM5YXc9PSIsInZhbHVlIjoiZXM0dHArS3paa2dsU3VMRFhDNFduQ1VBVHpOb3NUcHRhS2RhcElhS09aQ2dCOHZld1hDOFA4M24rdmQweThFd0tMMFRDK2VGZzk1c25tdjhxSk90a042SDRmbkpBZHlESHhhaTZPVmlNL0ZJWmR2bXQyRXJLSkF4L3M5M3daOW8iLCJtYWMiOiI0YTZiMWRkMmUxMGI5MmVhYzkzODA0YmE3MDQ5NTdjZmFmM2U2NjEwYmQzODlhMzhlZWViYzY0MTE2MGU4NjlkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETpanel" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETpanel"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETpanel"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETpanel" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETpanel">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETpanel" data-method="GET"
      data-path="panel"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETpanel', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETpanel"
                    onclick="tryItOut('GETpanel');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETpanel"
                    onclick="cancelTryOut('GETpanel');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETpanel"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>panel</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETpanel"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETpanel"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETusers">GET users</h2>

<p>
</p>



<span id="example-requests-GETusers">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/users" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/users"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETusers">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IktTb3JPaHk0N1l6VEgxNzRBTWIyRGc9PSIsInZhbHVlIjoieVlveWIyWFRRR1BPakJQUmlsQk51QU1hTUpvaEVGWmhwUnFYWXpZbGd3bDVGUlNubG41QzVnK1NheDlOQkZQU1NnNmQ4Um5MNzNEdzZyL3ViQkV4OGQ4Mm5vaFZBZkFqS1FKd2VYWkMrQnFab2h0U0dibitUeDl2REJJazdvZzkiLCJtYWMiOiJkY2RjM2YyYTllY2UzZDYwYzYxZjkyNzhiZjYwMGIxZDAxYjJiZTc0YTk1N2ViNTRjOWY0ZmRlNzljOWEzNWI1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IlAwb01ZTDNsZExvUUlVTlBIelhCZVE9PSIsInZhbHVlIjoiSTZaRmx6L2FNVE95dTU3dmtKK0kxQ0lYOWc4TXZSc05uYVlyekJlVDB3cU5kZXRGU2hZKy9IcnJlZk5FK2QzM1lQdTA2QWRkRlpmcHd0Wm1Pa0NkanQ3alRkVUFrcnVGK21kd29DcDZ5cTlpK3hBZTJsZDIvNHN2Q084U0V6U1kiLCJtYWMiOiIyOTYwZmI3MTFiZDAzMWZhYzQ5MTg1OTM2MTc3MTFmZWI1YTdkNTU4NTBhODIzNTZkOWVkMmVkYTgxMThhM2U2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETusers" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETusers"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETusers"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETusers" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETusers">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETusers" data-method="GET"
      data-path="users"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETusers', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETusers"
                    onclick="tryItOut('GETusers');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETusers"
                    onclick="cancelTryOut('GETusers');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETusers"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>users</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETusers"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETusers"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETusers-crear">Show the form for creating a new resource.</h2>

<p>
</p>



<span id="example-requests-GETusers-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/users/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/users/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETusers-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6InNucVlCTHRaZkg3L2NOUDE2WkQwRnc9PSIsInZhbHVlIjoicmN5eWcvNmUzclp4b2dWM0FRWm5Gbi9RY1hPeWdTVnFyMzdPZWZOSVFTQmloYnFJU1BmYzMzenN4YkxkTS9LMmhXcnhDOXVIVmFlVkdldkFKVVU1NlQwcEVZTFp5eVVoUGY5WEVYKzFIdGdqZDNZUDNzT3RQUjBhMTVmYW5sQWoiLCJtYWMiOiJkODY3ODlmODQwZDBkOWVjMTMwODA5MDg0OWVhZDlkZDllZTlhMDIzZTllOGQ1MGI5ODc0Nzc1YmE3Zjk1NmFmIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImF3SWZRcnkzVFkvWDdkaHVPUlZ5T0E9PSIsInZhbHVlIjoiblBKZEFtUEdaM0Y4aEl5TlR4dkI2VlAxb251VGZteU5hSFZCa2I1VEZCUSs1MzAwcW42ZUtkMHR6V0pPVHVBbU1td2JnTVNDelp3ZUdGa0w2ejUvZU1pNE1Zd2h0TmRFMENYVVU4cjFTaGZHbExuVzRVUjNKK2k3Z0tmTjJEdWgiLCJtYWMiOiJlYjBlNDAxMGI3YTc5OGQ1ZWM0NDZiYjAwMWM1OWYxM2NmZDZmODk5MmY1MDJhN2U4YzMzZDZkNDViMDY5YTUyIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETusers-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETusers-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETusers-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETusers-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETusers-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETusers-crear" data-method="GET"
      data-path="users/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETusers-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETusers-crear"
                    onclick="tryItOut('GETusers-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETusers-crear"
                    onclick="cancelTryOut('GETusers-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETusers-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>users/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETusers-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETusers-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTusers">Store a newly created resource in storage.</h2>

<p>
</p>



<span id="example-requests-POSTusers">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/users" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/users"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTusers">
</span>
<span id="execution-results-POSTusers" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTusers"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTusers"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTusers" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTusers">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTusers" data-method="POST"
      data-path="users"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTusers', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTusers"
                    onclick="tryItOut('POSTusers');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTusers"
                    onclick="cancelTryOut('POSTusers');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTusers"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>users</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTusers"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTusers"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETusers--id-">GET users/{id}</h2>

<p>
</p>



<span id="example-requests-GETusers--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/users/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/users/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETusers--id-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkRyU2NXWTNxRDJFRVJNV1BuQmJSQnc9PSIsInZhbHVlIjoiSlp0c1ovUFdSZVBjU0lRUUdtb1o1bWR3UVlMYzRnNGtZOXB2cFBKY1JzNVljVEhxQXJtakIvSkduektIRWtCR240Uk51bG1UcSs3WDlVM2JSNGsyK2xTWnJ6dXVwVFZqZHJPSWJON3c1Y3lGN24ydXVPNkcrYnc0dElqeTcwa28iLCJtYWMiOiJiMDM2NmQwNTFlNWIwYmNmZmExNjlmYzM2YjRiZjU1MDQ3ZDFlYjQ2NjU0NGI4MTIxZTJkNWJlNzY1YTI1OWFlIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Im1QMmlqaHdSUXRMYTZaSlZDK3NXTmc9PSIsInZhbHVlIjoid1U1ajh2aUQvcnZ4K1V0TWRjNWlpcFV4cy9pWkppQ043eU5oRmdDaUk4a2NsWVA4ZWlsNXVyNWRtYWJla2hQakRHRnVvNURDTU9qbGUzQWd0L0FVWmVhdGVqc2hSWkd3aWdVdklZNXpxYXFSVUhzMUR2UUxjWTdBSXhVczg2U3AiLCJtYWMiOiI2N2RjN2YxZjA4NTFkNTc0ZjI3MDIzNWE4ZWIxYjI2MGU0YjdiMWEyMzI4MTgzYzc2YmZkZjY0YWQwY2JhOTJhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETusers--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETusers--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETusers--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETusers--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETusers--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETusers--id-" data-method="GET"
      data-path="users/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETusers--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETusers--id-"
                    onclick="tryItOut('GETusers--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETusers--id-"
                    onclick="cancelTryOut('GETusers--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETusers--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>users/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETusers--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETusers--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="GETusers--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the user. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETusers--user--editar">Show the form for editing the specified resource.</h2>

<p>
</p>



<span id="example-requests-GETusers--user--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/users/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/users/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETusers--user--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6Iit3SUNyVDRRbmgrSlBZUEd0S2pWYXc9PSIsInZhbHVlIjoiOU1jOWY2OGNyVHNxWTZMS2hSRnkxTjY3TmZLZHBCSXF0YUk0N2hkNjE0WUVTYkMwbFJYdnBFM3hGSk5QTzhENUlHWEZ4L1FPMnhqSHdQL2tpWUZ0Tkk1UENMRkdUWmtXcjkxcDFHVklKYTU1T1JDMExyYWRtS3JZdDhGYTlZb1ciLCJtYWMiOiJiYzBkMGIzNGFiMTAwYWNkNjEwNjM1YzY4YmIxMDMwMmQ5YjliN2FkY2IzM2E5YTRiODM1MDA4MGI0Y2M4NzE3IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IkJaWVVMTlVySjRHa1dwNnV3dXR6Smc9PSIsInZhbHVlIjoieW1KZThia0FUeDRxSmpmWjlkUklWNHhPdnpIVDhOVE5OODNzYjZreExaTVg0dUN3OUxVaGp5dmVQLzlaQW13eE9XZ0JSSVdVVndYUzZvS2JYbEV0a3I1RU5oRmM1eU1ObjBLcjFpOTRsTDkrK0xvVlJZSG95OXdhMGpmb3ZOdUEiLCJtYWMiOiI2YTAwOGRiOGNhZjlkNTZjNmY1ZTg1YTA4YzQ0NmE1ZjkzZGFhMDY4OTRmMGMzNDZiZjk2ZjI3OTMyMzM4NjBhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETusers--user--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETusers--user--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETusers--user--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETusers--user--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETusers--user--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETusers--user--editar" data-method="GET"
      data-path="users/{user}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETusers--user--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETusers--user--editar"
                    onclick="tryItOut('GETusers--user--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETusers--user--editar"
                    onclick="cancelTryOut('GETusers--user--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETusers--user--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>users/{user}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETusers--user--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETusers--user--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>user</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="user"                data-endpoint="GETusers--user--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The user. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTusers--id-">Update the specified resource in storage.</h2>

<p>
</p>



<span id="example-requests-PUTusers--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/users/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/users/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "PUT",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTusers--id-">
</span>
<span id="execution-results-PUTusers--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTusers--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTusers--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTusers--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTusers--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTusers--id-" data-method="PUT"
      data-path="users/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTusers--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTusers--id-"
                    onclick="tryItOut('PUTusers--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTusers--id-"
                    onclick="cancelTryOut('PUTusers--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTusers--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>users/{id}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>users/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTusers--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTusers--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="PUTusers--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the user. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-DELETEusers--id-">Remove the specified resource from storage.</h2>

<p>
</p>



<span id="example-requests-DELETEusers--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/users/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/users/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEusers--id-">
</span>
<span id="execution-results-DELETEusers--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEusers--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEusers--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEusers--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEusers--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEusers--id-" data-method="DELETE"
      data-path="users/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEusers--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEusers--id-"
                    onclick="tryItOut('DELETEusers--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEusers--id-"
                    onclick="cancelTryOut('DELETEusers--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEusers--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>users/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEusers--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEusers--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="DELETEusers--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the user. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETdocentes">GET docentes</h2>

<p>
</p>



<span id="example-requests-GETdocentes">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/docentes" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/docentes"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETdocentes">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlUxdjV1dENKUnRKdFJEb3haaERlZXc9PSIsInZhbHVlIjoiVy94bnNEb1BacnNnR2tqb3F2Q3JYVnYxVEtsQjYxOFRXVkFqTm1ZM2ROOWRDelNIZjZjU05wa1ZSVy9lKzJCSTJYL2RHZEppWWtBWm9rR0VWMHVvVkZ2V0VVSGtxcGhCaGFYZ1MwNm1uZGZLNW9wTjBNRzFyS09sbjNFVWhyY0wiLCJtYWMiOiIwNzhlMmFlMGJmODE4Y2MxNTg1NWZhYjFiMDcyZmU4ZjEzMjQxMTEyZThkNTc2M2NjYjg1MzUyMzA4ZWUyNjk2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InJDWFZDNjdvN1dsa2MzWnAxc3J6VHc9PSIsInZhbHVlIjoiNEZSZiswb01SLzB0Nk1VNVhtVlZQNi8vdG54WWtpd0xENXdKUTVwNGJvNlZHcEFVQ0ZTbnM4dVlqR2pwOG1sQjVrMDl6OTdUNXZYRHduVzJlL0xQblB6VVE5b29CM212UUlRK3dzMmQ4QmhzQTd4R3ovN0t0eHdORnN1Zk53RXQiLCJtYWMiOiJjNmI1N2Q4NjJkYjVkYjQ5ZTQ2ZWI0MTIzYzU2NjJjNzgxMDBkZDlmOWYyYjA2YzlkZjRhMGM3MTcyOTAzNTJkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETdocentes" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETdocentes"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETdocentes"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETdocentes" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETdocentes">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETdocentes" data-method="GET"
      data-path="docentes"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETdocentes', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETdocentes"
                    onclick="tryItOut('GETdocentes');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETdocentes"
                    onclick="cancelTryOut('GETdocentes');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETdocentes"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>docentes</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETdocentes"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETdocentes"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTdocentes">POST docentes</h2>

<p>
</p>



<span id="example-requests-POSTdocentes">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/docentes" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"email\": \"zbailey@example.net\",
    \"password\": \"-0pBNvYgxw\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/docentes"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "email": "zbailey@example.net",
    "password": "-0pBNvYgxw"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTdocentes">
</span>
<span id="execution-results-POSTdocentes" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTdocentes"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTdocentes"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTdocentes" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTdocentes">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTdocentes" data-method="POST"
      data-path="docentes"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTdocentes', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTdocentes"
                    onclick="tryItOut('POSTdocentes');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTdocentes"
                    onclick="cancelTryOut('POSTdocentes');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTdocentes"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>docentes</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTdocentes"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTdocentes"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTdocentes"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTdocentes"
               value="zbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Must not be greater than 255 characters. Example: <code>zbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTdocentes"
               value="-0pBNvYgxw"
               data-component="body">
    <br>
<p>Must be at least 8 characters. Example: <code>-0pBNvYgxw</code></p>
        </div>
        </form>

                    <h2 id="endpoints-PUTdocentes--docente-">PUT docentes/{docente}</h2>

<p>
</p>



<span id="example-requests-PUTdocentes--docente-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/docentes/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/docentes/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTdocentes--docente-">
</span>
<span id="execution-results-PUTdocentes--docente-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTdocentes--docente-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTdocentes--docente-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTdocentes--docente-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTdocentes--docente-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTdocentes--docente-" data-method="PUT"
      data-path="docentes/{docente}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTdocentes--docente-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTdocentes--docente-"
                    onclick="tryItOut('PUTdocentes--docente-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTdocentes--docente-"
                    onclick="cancelTryOut('PUTdocentes--docente-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTdocentes--docente-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>docentes/{docente}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>docentes/{docente}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTdocentes--docente-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTdocentes--docente-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>docente</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="docente"                data-endpoint="PUTdocentes--docente-"
               value="architecto"
               data-component="url">
    <br>
<p>The docente. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTdocentes--docente-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="PUTdocentes--docente-"
               value=""
               data-component="body">
    <br>

        </div>
        </form>

                    <h2 id="endpoints-DELETEdocentes--docente-">DELETE docentes/{docente}</h2>

<p>
</p>



<span id="example-requests-DELETEdocentes--docente-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/docentes/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/docentes/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEdocentes--docente-">
</span>
<span id="execution-results-DELETEdocentes--docente-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEdocentes--docente-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEdocentes--docente-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEdocentes--docente-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEdocentes--docente-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEdocentes--docente-" data-method="DELETE"
      data-path="docentes/{docente}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEdocentes--docente-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEdocentes--docente-"
                    onclick="tryItOut('DELETEdocentes--docente-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEdocentes--docente-"
                    onclick="cancelTryOut('DELETEdocentes--docente-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEdocentes--docente-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>docentes/{docente}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEdocentes--docente-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEdocentes--docente-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>docente</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="docente"                data-endpoint="DELETEdocentes--docente-"
               value="architecto"
               data-component="url">
    <br>
<p>The docente. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTdocentes-bulk-destroy">POST docentes/bulk-destroy</h2>

<p>
</p>



<span id="example-requests-POSTdocentes-bulk-destroy">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/docentes/bulk-destroy" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"teacher_ids\": [
        \"architecto\"
    ]
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/docentes/bulk-destroy"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "teacher_ids": [
        "architecto"
    ]
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTdocentes-bulk-destroy">
</span>
<span id="execution-results-POSTdocentes-bulk-destroy" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTdocentes-bulk-destroy"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTdocentes-bulk-destroy"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTdocentes-bulk-destroy" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTdocentes-bulk-destroy">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTdocentes-bulk-destroy" data-method="POST"
      data-path="docentes/bulk-destroy"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTdocentes-bulk-destroy', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTdocentes-bulk-destroy"
                    onclick="tryItOut('POSTdocentes-bulk-destroy');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTdocentes-bulk-destroy"
                    onclick="cancelTryOut('POSTdocentes-bulk-destroy');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTdocentes-bulk-destroy"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>docentes/bulk-destroy</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTdocentes-bulk-destroy"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTdocentes-bulk-destroy"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>teacher_ids</code></b>&nbsp;&nbsp;
<small>string[]</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="teacher_ids[0]"                data-endpoint="POSTdocentes-bulk-destroy"
               data-component="body">
        <input type="text" style="display: none"
               name="teacher_ids[1]"                data-endpoint="POSTdocentes-bulk-destroy"
               data-component="body">
    <br>

        </div>
        </form>

                    <h2 id="endpoints-GETgalaxias">GET galaxias</h2>

<p>
</p>



<span id="example-requests-GETgalaxias">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/galaxias" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/galaxias"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgalaxias">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImxBMDhMc2djRkptU2dseHhjNjlUSnc9PSIsInZhbHVlIjoiL0o0SThGc1dpSE83cHM0cnhjRmZOYlBJMlRDRUNEb1Y2MXBBMzcrVW84c3FUVnVRKy85N1UvcUMxSitnYVM1dktrdkxUZ1pEMXhhdHZsY0hLSkRSR2h3ZXM2Q0RIVlYyNUhrL1p5RlM2bHVwSnBDUnhOaFVLSWR0N3pnWThQRSsiLCJtYWMiOiIyMGM3ZGI4ZDM3Y2NjMDgwZGUzMTc5Y2Y2NjE2YWVmNTNjMmE1ZTEzNjQ0MTgxODc3YzEwMjJiYzdlZDgyY2IxIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImpaOHdmdWQzU3NKZnUzVmxxQ0QrOVE9PSIsInZhbHVlIjoiYTJlTGEwMEc0Z0dmZy9IZ2ZvWTRDcU9xZGZxVUdJQk9kUGVxRmpnZ04wbFAxcFFhYXZMSDdrTmlrOGZGTVNiemdVWDh2d0kwV3VGWitWbzliVThacTVpZGlZejRPQ2p6bWIzOXRIZGF2WjBHYXRpcW1RTEo4d2tXUnl0QXIvdmMiLCJtYWMiOiJiMzMyY2ExNDc4ZGZkMmY2MDNlNDVkMTc0OTQwM2M4ZWI0OWE5NzQ3ZjhhNzYyNmYwMTQ2ZTYzYTE5YzBjMzdlIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgalaxias" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgalaxias"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgalaxias"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgalaxias" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgalaxias">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgalaxias" data-method="GET"
      data-path="galaxias"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgalaxias', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgalaxias"
                    onclick="tryItOut('GETgalaxias');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgalaxias"
                    onclick="cancelTryOut('GETgalaxias');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgalaxias"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>galaxias</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgalaxias"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgalaxias"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETgalaxias-crear">GET galaxias/crear</h2>

<p>
</p>



<span id="example-requests-GETgalaxias-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/galaxias/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/galaxias/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgalaxias-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6InIzSDlUMG5YUW1SZFFKd3VyQm1xbHc9PSIsInZhbHVlIjoiUHFydU9xRE5HZEZISU5yamY0eVdTT2ZCbVExM3puMTVUK1YvTlpMRVFTSWxzbmx0ajRzaGxuUXRHSWlJWHBNYkUvbW1wZGN5bVlJZEFmZzIrMndMT25XWFBGOXpETGlFZEZybzJFK3ZvZVNLSWhiMVVnVk5SQ0NNQ0FSQnIzMDAiLCJtYWMiOiI0NjM3OGU0MmFmN2YxMGFlZDdiNTQ5ZTQwN2I2YThiOGQ1MDM1YjcxZmZkN2ZjYzBjMmUzMjAyMDNmYWEwZmQ5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjN4RVM0dUFGU0ppOWJINk9lVnljaUE9PSIsInZhbHVlIjoiLzYwSnB1K281dUtUdnRvaEh1Y0d3Ykg0U21YY09YVFc3MVNqbjVoSE1mWWJtU2xQTENXTGtTMlZqcWY4a2dtMEwwbWZWWFNFYlBFYlFiY1JPMGZwWlpyaWsvbm5xZ0hWZzgzNVp5QTUyd3BqQUF2ajkxVFVqMmVWekRSYVNYMWYiLCJtYWMiOiIxNzE4MDYyOThmNGU0YjQxZjQ2NzMyYTliZTRmYmE2MGFiYzFmZmY5MTUxZGNiZGQwNmY2YWE3ZTMxNWViYzdhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgalaxias-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgalaxias-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgalaxias-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgalaxias-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgalaxias-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgalaxias-crear" data-method="GET"
      data-path="galaxias/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgalaxias-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgalaxias-crear"
                    onclick="tryItOut('GETgalaxias-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgalaxias-crear"
                    onclick="cancelTryOut('GETgalaxias-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgalaxias-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>galaxias/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgalaxias-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgalaxias-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTgalaxias">POST galaxias</h2>

<p>
</p>



<span id="example-requests-POSTgalaxias">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/galaxias" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "name=b"\
    --form "image=@C:\Users\Lenovo\AppData\Local\Temp\php8D11.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/galaxias"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('name', 'b');
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "POST",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTgalaxias">
</span>
<span id="execution-results-POSTgalaxias" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTgalaxias"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTgalaxias"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTgalaxias" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTgalaxias">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTgalaxias" data-method="POST"
      data-path="galaxias"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTgalaxias', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTgalaxias"
                    onclick="tryItOut('POSTgalaxias');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTgalaxias"
                    onclick="cancelTryOut('POSTgalaxias');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTgalaxias"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>galaxias</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTgalaxias"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTgalaxias"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTgalaxias"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="POSTgalaxias"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8D11.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETgalaxias--galaxia-">GET galaxias/{galaxia}</h2>

<p>
</p>



<span id="example-requests-GETgalaxias--galaxia-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/galaxias/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/galaxias/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgalaxias--galaxia-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImtqNmszbEZjb3hwWUR4UmtuamVPZEE9PSIsInZhbHVlIjoiU09ETzNVelhXM2puUUlPa1pLV2hMWmRxaXdOU3BVdVlzKzZjM09JeEF3eDRIVUoxZHhaQlBUY3FneU5VWGkwU0RvOHhVWlpoMHd3Q3VHd1cxa1lYRVk1d0hhWE9mVUNHSFZlUVh3KzNJR25SYnorS2QvVzZMemJVc0pHN2ZPTXYiLCJtYWMiOiJhZDFmZjI0ZWE1NzVhMzBlMTg4NDViNjExNTUzNTlhYzExZTRlYmNmYzAyOWZkZTc1NjY0ODI5YzMwYmVlOTc5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IlpHYmJBd0hxZWUwR3JLYytGRjJOL0E9PSIsInZhbHVlIjoieklET0hQWUR1ZmVRL01IVDY2bDF3cWc4N0R5K1FoVVM5UDVnYjFMWEhSMEtpVldZWGV4SVNZenRmcHNpTklLOGlyL25aNDFaTFRZdUVXSTlSdHVSUDdFdVAzbHZjNjVUajU1V1dWeTVTVk9vYVBWbVlwVjlqNEVPTURFRzcxWU8iLCJtYWMiOiJkNjU5NjI0MmQ0NTkwMDZhZjk4NjY4MWVkMjk3NmRjMmZkNTc2M2RhOGQxNmZiMDRjYTk3YjU0YTUyNmNlMjY0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgalaxias--galaxia-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgalaxias--galaxia-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgalaxias--galaxia-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgalaxias--galaxia-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgalaxias--galaxia-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgalaxias--galaxia-" data-method="GET"
      data-path="galaxias/{galaxia}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgalaxias--galaxia-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgalaxias--galaxia-"
                    onclick="tryItOut('GETgalaxias--galaxia-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgalaxias--galaxia-"
                    onclick="cancelTryOut('GETgalaxias--galaxia-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgalaxias--galaxia-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>galaxias/{galaxia}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgalaxias--galaxia-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgalaxias--galaxia-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>galaxia</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="galaxia"                data-endpoint="GETgalaxias--galaxia-"
               value="architecto"
               data-component="url">
    <br>
<p>The galaxia. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETgalaxias--galaxia--editar">GET galaxias/{galaxia}/editar</h2>

<p>
</p>



<span id="example-requests-GETgalaxias--galaxia--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/galaxias/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/galaxias/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETgalaxias--galaxia--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6Ilo3aDJZV0FyTHYrc2RVWTlvTm1iZmc9PSIsInZhbHVlIjoiaERGT0pkUHpCaUpWTjV4MzlYWFlJak5Pd1dRNUdsM0tCeDZvREFNNzhUTTI0Q0xQVnkzZCtZU05CZnJ4L3ZTekF6UVZsLzgwaXRIMmk5VXhoTm1UVWV1QWs5TEJ0ZjBmZW92a3BJUVFUc0NzVVRYLzdmSVpqNUJTaUlaNG16bngiLCJtYWMiOiI4NGZjYjBlMmI0Y2Q5ZDc5ZWIzOWVhOWEwMDc4M2U0ZTdiZmYwZDZlMDU4MzMyZjQ1ZmNjMzFhYjVjMjU3YmUxIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IlRheHV6dUFqQVZ2RExZanRGSDJNVFE9PSIsInZhbHVlIjoiWjJGendqRUt1QXJaNjBJRWs3OEY2QTMxYk5pVndpMXdwSWlKMnYzZUQ3b3VTeE5tTWswMm5OZTJzL3h0MEQ3TUR2d2ZiRkVIN1E2dnRVVysvRDhnU3NNL2tlSGhVNVozbkJQRTAybnl1QjF4ME5lSlYrRkR0L1hBdlVqSjZ6angiLCJtYWMiOiJjYmNkODUzOTA2NWY3ZTY4M2I5NWViZWQzYjFlYjhiMWVjMDlhOTc2YmIzOGU0MzFmMWIzOGZiZWQyNGY4M2JhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETgalaxias--galaxia--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETgalaxias--galaxia--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETgalaxias--galaxia--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETgalaxias--galaxia--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETgalaxias--galaxia--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETgalaxias--galaxia--editar" data-method="GET"
      data-path="galaxias/{galaxia}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETgalaxias--galaxia--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETgalaxias--galaxia--editar"
                    onclick="tryItOut('GETgalaxias--galaxia--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETgalaxias--galaxia--editar"
                    onclick="cancelTryOut('GETgalaxias--galaxia--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETgalaxias--galaxia--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>galaxias/{galaxia}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETgalaxias--galaxia--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETgalaxias--galaxia--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>galaxia</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="galaxia"                data-endpoint="GETgalaxias--galaxia--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The galaxia. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTgalaxias--galaxia-">PUT galaxias/{galaxia}</h2>

<p>
</p>



<span id="example-requests-PUTgalaxias--galaxia-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/galaxias/architecto" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "image=@C:\Users\Lenovo\AppData\Local\Temp\php8DCE.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/galaxias/architecto"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "PUT",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTgalaxias--galaxia-">
</span>
<span id="execution-results-PUTgalaxias--galaxia-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTgalaxias--galaxia-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTgalaxias--galaxia-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTgalaxias--galaxia-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTgalaxias--galaxia-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTgalaxias--galaxia-" data-method="PUT"
      data-path="galaxias/{galaxia}"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTgalaxias--galaxia-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTgalaxias--galaxia-"
                    onclick="tryItOut('PUTgalaxias--galaxia-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTgalaxias--galaxia-"
                    onclick="cancelTryOut('PUTgalaxias--galaxia-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTgalaxias--galaxia-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>galaxias/{galaxia}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>galaxias/{galaxia}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTgalaxias--galaxia-"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTgalaxias--galaxia-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>galaxia</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="galaxia"                data-endpoint="PUTgalaxias--galaxia-"
               value="architecto"
               data-component="url">
    <br>
<p>The galaxia. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTgalaxias--galaxia-"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="PUTgalaxias--galaxia-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8DCE.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEgalaxias--galaxia-">DELETE galaxias/{galaxia}</h2>

<p>
</p>



<span id="example-requests-DELETEgalaxias--galaxia-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/galaxias/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/galaxias/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEgalaxias--galaxia-">
</span>
<span id="execution-results-DELETEgalaxias--galaxia-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEgalaxias--galaxia-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEgalaxias--galaxia-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEgalaxias--galaxia-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEgalaxias--galaxia-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEgalaxias--galaxia-" data-method="DELETE"
      data-path="galaxias/{galaxia}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEgalaxias--galaxia-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEgalaxias--galaxia-"
                    onclick="tryItOut('DELETEgalaxias--galaxia-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEgalaxias--galaxia-"
                    onclick="cancelTryOut('DELETEgalaxias--galaxia-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEgalaxias--galaxia-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>galaxias/{galaxia}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEgalaxias--galaxia-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEgalaxias--galaxia-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>galaxia</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="galaxia"                data-endpoint="DELETEgalaxias--galaxia-"
               value="architecto"
               data-component="url">
    <br>
<p>The galaxia. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETplanetas">GET planetas</h2>

<p>
</p>



<span id="example-requests-GETplanetas">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/planetas" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/planetas"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETplanetas">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlM2cDhCWEx5NzFxai9TNG9ETDlKNmc9PSIsInZhbHVlIjoiU2EyYzh1VWJwOGwyNlpsMFZkVTVQRXhOUlI3VG9ycXUxRG5idlQvNFhOUVkrOVczbjVLT0RmQ1FScjFsaFFPU200WXhFSUpjZnR4QnRxQ3hlbkNvWWNXdjdRWGJCdE5HNktRZzRWbXA2dllWaExVL2tueDRuRkE4STlRWW9ma0giLCJtYWMiOiJkODkyODE0ZTY5ZjhmZWQ2ZDhmNjMxMTIwNmJiZTZmZmVhNDU0MWM1NWU2NGQ4NDMzYWQ0Mzk1ZTE3ZmY2MTM1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InBHeUtrM2lkL0FMVGQxL0FQb3BYZFE9PSIsInZhbHVlIjoiRnBmNWRqN09KYzk5RnJkaHpZdkZBZ0ZWN3NxRVVsQ2RxcFB4RERTMGwzMC9RT05NSlJqTUZEZmNhZnhBbHA4TzFlbllyVUExSytFYkJWOGI4V0JtL0ZRQUNjTWVpcmN3VTBmREY0ZmdSTkdCWjdSeDRwYmxCMnllbDdGQW8rZXYiLCJtYWMiOiI2MjhiOTIyOGRlMzRkYmEyOWJjN2E2MDUxNTZhMTlkMmQxM2U1ZjZkYmFmY2ViNDc0ODFkZmVlMzljMDM0YTdiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETplanetas" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETplanetas"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETplanetas"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETplanetas" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETplanetas">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETplanetas" data-method="GET"
      data-path="planetas"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETplanetas', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETplanetas"
                    onclick="tryItOut('GETplanetas');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETplanetas"
                    onclick="cancelTryOut('GETplanetas');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETplanetas"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>planetas</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETplanetas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETplanetas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETplanetas-crear">GET planetas/crear</h2>

<p>
</p>



<span id="example-requests-GETplanetas-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/planetas/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/planetas/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETplanetas-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkJ0a2tOWWFSZVJSZ3pUYU9rbm4wdUE9PSIsInZhbHVlIjoiTWhXSThTekFPQytlL2I1a285dzJrSGVOS24rMkNpbGRhTGRQdDBEQmY1azJFL1RnRi93SFV3RFdmdDFsQ2MzUktwU3VXeU9oU2xHK2VXU08rL2dtWUFNbDAyWjNmMXFJV3dBTzI1SFFGQjA4cnh0ZzhOMTltU2pVenhWM05WUGwiLCJtYWMiOiI4MzBmZjkwZTNkYWQxYjMzNTY4OTkzMmM4MGMyNzI4NDhjODM2ZmZlNTYzNTZiMDc3MzA5NGQ0ZjllODk0ZDczIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IktwbURnb3NObUphNmtXejdwSW51UWc9PSIsInZhbHVlIjoiVXVXSyt4TUM2U084WVRJUkhxSzBuRFhXMnBzMEVuOXh1Qkc5MnRWNlhLMTlmVE56YWZWZUp4bThsVEFmWVhIOFpmdHBqMm9TdFFzenhtYkIwVytVa1RXRTNrZHBKbDRGODU5Y2E1bHNDc3FkR0N4cWI3T3hwc2QranB1R3ZmMFMiLCJtYWMiOiJlMDNmNWFhNDVmYzdmMTdkNmNiMDdjYTUyMWJlYWJlMjEzMTkzZTFhYmQ4NGYwMjZiMWFhMGY1NDgwODVjYmQwIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETplanetas-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETplanetas-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETplanetas-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETplanetas-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETplanetas-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETplanetas-crear" data-method="GET"
      data-path="planetas/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETplanetas-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETplanetas-crear"
                    onclick="tryItOut('GETplanetas-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETplanetas-crear"
                    onclick="cancelTryOut('GETplanetas-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETplanetas-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>planetas/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETplanetas-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETplanetas-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTplanetas">POST planetas</h2>

<p>
</p>



<span id="example-requests-POSTplanetas">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/planetas" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "name=b"\
    --form "galaxy_id=architecto"\
    --form "description=Eius et animi quos velit et."\
    --form "image=@C:\Users\Lenovo\AppData\Local\Temp\php8DEE.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/planetas"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('name', 'b');
body.append('galaxy_id', 'architecto');
body.append('description', 'Eius et animi quos velit et.');
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "POST",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTplanetas">
</span>
<span id="execution-results-POSTplanetas" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTplanetas"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTplanetas"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTplanetas" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTplanetas">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTplanetas" data-method="POST"
      data-path="planetas"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTplanetas', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTplanetas"
                    onclick="tryItOut('POSTplanetas');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTplanetas"
                    onclick="cancelTryOut('POSTplanetas');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTplanetas"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>planetas</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTplanetas"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTplanetas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTplanetas"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>galaxy_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="galaxy_id"                data-endpoint="POSTplanetas"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the galaxies table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="POSTplanetas"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8DEE.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>description</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="description"                data-endpoint="POSTplanetas"
               value="Eius et animi quos velit et."
               data-component="body">
    <br>
<p>Example: <code>Eius et animi quos velit et.</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETplanetas--planeta-">GET planetas/{planeta}</h2>

<p>
</p>



<span id="example-requests-GETplanetas--planeta-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/planetas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/planetas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETplanetas--planeta-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6InNEMDQxQWJjdU1vdVBheUNLam5LbWc9PSIsInZhbHVlIjoiWHNGNHQ4ME8vOUJxY3M5bHFDOUNEdkM4ZEFqcDBlUGg1TjUveTlWcFdPWU8xeGFHK2ljWlgwRnI5N3djYy9WZ1hTaWFRSytjNTZHN3BNa1BPTkdOaWxpS21vMlJEM1IvNCtQdUtDK0tOYlQzOFdjdzRzelRuLzNFK29IV1pmUk0iLCJtYWMiOiI2NmMzNTM4Y2MxYmYwNzQ4OTU1OWY0YjRiMDNkYjNkMmYzYTllMDAyMzIwOGYyN2M2OGIyYWRkYzgzNGI1YjhiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjRaWmlDWXNDenRsOW1wbXFsMlB2R1E9PSIsInZhbHVlIjoickdMTU1TdDF1RVRTYlltYmhrbFNCY3IxNDR0VFdpanIxZWg3RUlQYzg4QSthQ3hjVzNSa01GTXdWbTgyNytWYUp4SGJHeWFaN0loZndXcUJwOEVtT3U1eVBFbWxTOFAyZ2Rva1JEYW1RYmcxc3JKZyt4VGw3em1mbTVzalR3Z20iLCJtYWMiOiIzZmYzNGZjODg2ZmVmZTVhZDczOWRkZjdjOWM5YjkyZDBlZDY0Zjg1N2RiYmQyODlmNGRiOTFjN2Q2Y2M2NWI4IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETplanetas--planeta-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETplanetas--planeta-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETplanetas--planeta-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETplanetas--planeta-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETplanetas--planeta-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETplanetas--planeta-" data-method="GET"
      data-path="planetas/{planeta}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETplanetas--planeta-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETplanetas--planeta-"
                    onclick="tryItOut('GETplanetas--planeta-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETplanetas--planeta-"
                    onclick="cancelTryOut('GETplanetas--planeta-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETplanetas--planeta-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>planetas/{planeta}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETplanetas--planeta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETplanetas--planeta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>planeta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planeta"                data-endpoint="GETplanetas--planeta-"
               value="architecto"
               data-component="url">
    <br>
<p>The planeta. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETplanetas--planeta--editar">GET planetas/{planeta}/editar</h2>

<p>
</p>



<span id="example-requests-GETplanetas--planeta--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/planetas/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/planetas/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETplanetas--planeta--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlJac0NyRjYwMFljUUQvNVhKZWVnZnc9PSIsInZhbHVlIjoieExJQVc0NHorUVlKdDdETUtoa25TZFlUTTR6VmcwWFNSbW1TY1RXS1oxQnlwTm5nVGZxeVJmWEh5NGFRYkt3bEhrYzQ0Sk4yNnhJSWVDWmhBT3VsSjc0MVVCWnlpRHZNTHQ2aFhwK1dnRkwwU2ZKc1QyUmVXZjVTaHhHTVJaVUkiLCJtYWMiOiJiYzg1YzY5ZThiMGViZTI3NjFjNjI4OTgyOTU5OGRiOTkwNGI2NDIxNTM0NDAxNTdkOTg4NWFiOTkxMGUzNTVjIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Ik00cGtnM05sZ3QzTHpZcXBjeFpvMFE9PSIsInZhbHVlIjoiTDQ5d0NncDBKYkkwNTJwSFRpdXRIMVU1dTAwOEN6RVo0Y1pmUzIzZStlVGFFdGkxZkdEa3V0VERsNlFjVm4xMmxZd1BPUTE1SUQyblhlOUFLdXlHSmFoVDZsY1RpY3NMNndwVnE1aXVTQWhVZ05LNWp3TFFQUWpkK3lHMTVIdEIiLCJtYWMiOiI0ZDU1ZTIxYWQ0ZDY1Y2RhYTUyN2ZkMTc1ZjkzZGQzNjlmY2M3ZmY3ZmM4ZWI4NTRlMjBkZDU2MWJiYjc5ZTgxIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETplanetas--planeta--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETplanetas--planeta--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETplanetas--planeta--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETplanetas--planeta--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETplanetas--planeta--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETplanetas--planeta--editar" data-method="GET"
      data-path="planetas/{planeta}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETplanetas--planeta--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETplanetas--planeta--editar"
                    onclick="tryItOut('GETplanetas--planeta--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETplanetas--planeta--editar"
                    onclick="cancelTryOut('GETplanetas--planeta--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETplanetas--planeta--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>planetas/{planeta}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETplanetas--planeta--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETplanetas--planeta--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>planeta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planeta"                data-endpoint="GETplanetas--planeta--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The planeta. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTplanetas--planeta-">PUT planetas/{planeta}</h2>

<p>
</p>



<span id="example-requests-PUTplanetas--planeta-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/planetas/architecto" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "galaxy_id=architecto"\
    --form "description=Eius et animi quos velit et."\
    --form "image=@C:\Users\Lenovo\AppData\Local\Temp\php8DFF.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/planetas/architecto"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('galaxy_id', 'architecto');
body.append('description', 'Eius et animi quos velit et.');
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "PUT",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTplanetas--planeta-">
</span>
<span id="execution-results-PUTplanetas--planeta-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTplanetas--planeta-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTplanetas--planeta-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTplanetas--planeta-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTplanetas--planeta-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTplanetas--planeta-" data-method="PUT"
      data-path="planetas/{planeta}"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTplanetas--planeta-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTplanetas--planeta-"
                    onclick="tryItOut('PUTplanetas--planeta-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTplanetas--planeta-"
                    onclick="cancelTryOut('PUTplanetas--planeta-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTplanetas--planeta-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>planetas/{planeta}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>planetas/{planeta}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTplanetas--planeta-"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTplanetas--planeta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>planeta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planeta"                data-endpoint="PUTplanetas--planeta-"
               value="architecto"
               data-component="url">
    <br>
<p>The planeta. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTplanetas--planeta-"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>galaxy_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="galaxy_id"                data-endpoint="PUTplanetas--planeta-"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the galaxies table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="PUTplanetas--planeta-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8DFF.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>description</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="description"                data-endpoint="PUTplanetas--planeta-"
               value="Eius et animi quos velit et."
               data-component="body">
    <br>
<p>Example: <code>Eius et animi quos velit et.</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEplanetas--planeta-">DELETE planetas/{planeta}</h2>

<p>
</p>



<span id="example-requests-DELETEplanetas--planeta-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/planetas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/planetas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEplanetas--planeta-">
</span>
<span id="execution-results-DELETEplanetas--planeta-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEplanetas--planeta-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEplanetas--planeta-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEplanetas--planeta-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEplanetas--planeta-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEplanetas--planeta-" data-method="DELETE"
      data-path="planetas/{planeta}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEplanetas--planeta-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEplanetas--planeta-"
                    onclick="tryItOut('DELETEplanetas--planeta-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEplanetas--planeta-"
                    onclick="cancelTryOut('DELETEplanetas--planeta-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEplanetas--planeta-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>planetas/{planeta}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEplanetas--planeta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEplanetas--planeta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>planeta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planeta"                data-endpoint="DELETEplanetas--planeta-"
               value="architecto"
               data-component="url">
    <br>
<p>The planeta. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETejercicios">GET ejercicios</h2>

<p>
</p>



<span id="example-requests-GETejercicios">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/ejercicios" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/ejercicios"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETejercicios">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6InlnK3QveHhUWDdqeWlYa1dmak1maXc9PSIsInZhbHVlIjoiZ3YyVWVtWVhoR0IyU3p3TCtVVVBVMzM2RUdDNDNpQjI1WExxVU85OFJDdmlVVkhtVllsajNvYlBzdG4zdmQ3cWVrYXo2YWVyOHArNmIzd21tRjF3Q2phVm5icWxSU2lId0kxYXJYZm96K2JpSUNSZjJuTTNLaHdXUlBSZzIreWMiLCJtYWMiOiI4NmMwNjMwZjU1NTQ3ZWM1OTI4MGY1NGIzODUyYjY5Y2I0YzUxZjZkNzg0MGJkOWEyYjFhNDU3YWZiMWNjMGI0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjR0aHkwbmR4djkwaDREMlFSY3pvV0E9PSIsInZhbHVlIjoiWGlQTCtoZFJkRWI1V2hUT0pHN1JLWE9kb3RIRVBBMTRmYjNGbnRyZ3N0eUxkWVlWUHIrNTI4K0crWHZpb3ZFQkx6QklNMWxoOUlPOWh5MXl5V3hrcEgrL0s5LzMyaFZBNExCYVgrVFBmL2l4L2lFQmNSaHBxS2NYK3k3L2tGWHMiLCJtYWMiOiI0YzVhNzExMTA5MTg4ZjdiNzBjOTJlMzMwODhkOGNlODZlZDg0MmFmOTgxYjQ5NDhmMmE2YTAzYjRiNmM1NzE1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETejercicios" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETejercicios"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETejercicios"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETejercicios" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETejercicios">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETejercicios" data-method="GET"
      data-path="ejercicios"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETejercicios', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETejercicios"
                    onclick="tryItOut('GETejercicios');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETejercicios"
                    onclick="cancelTryOut('GETejercicios');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETejercicios"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>ejercicios</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETejercicios"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETejercicios"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETejercicios-crear">GET ejercicios/crear</h2>

<p>
</p>



<span id="example-requests-GETejercicios-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/ejercicios/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/ejercicios/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETejercicios-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IndVZW1nWmtiMFpCWjFOU1NZUEl2Rmc9PSIsInZhbHVlIjoibG0yQnVsSjhPYTJzWmNDLzZHY3VBaXVrRDNZNGtjSFFycnFtSzY2K3lHbUxzaWlad0pjNzZCRjZqMmhXcThwYUY0RzYremRnTzVJN296cS9ZNExCQ0ZzdXYrUThHQzhZN1JjTDhMaUZDUFFWUnJHTzNqczhDTFgyS2dwaGdheVUiLCJtYWMiOiJhZWY5OGNkOGQ4NTAzNzNlNzZmNGY5NjA1NDI5ZGM1OGJiZWJiZTFkY2VlYzllZmM0N2QwMDI2YWZlOGUwOGRhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Inl4WjhwRmg5WnR1TWdpWnJyaDdwNEE9PSIsInZhbHVlIjoic2YxRWNubndIY0E1dlB5TURvL0lMa0tKeDFwdDM5NTRyTDJlQU1uQU9UOWtYRmgwZWFvbUtzUENLZWtMSEJOaG5sSENmakJUc2lULzFpZ0xEc1Z6emNaTmVlUUU3N0tBV3l0QWg1Tjlnait3VlBmODN2T3hPUjVFVUExeldTVXoiLCJtYWMiOiJmZmNmOWE4MDhiZTcxMmRiMWYyOTNlZTQ1NjE0YmQ2NTk3YzcwMTU2OGNhY2NiZTk3NzYzMzllYjk1NTc0ZmZhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETejercicios-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETejercicios-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETejercicios-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETejercicios-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETejercicios-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETejercicios-crear" data-method="GET"
      data-path="ejercicios/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETejercicios-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETejercicios-crear"
                    onclick="tryItOut('GETejercicios-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETejercicios-crear"
                    onclick="cancelTryOut('GETejercicios-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETejercicios-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>ejercicios/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETejercicios-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETejercicios-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTejercicios">POST ejercicios</h2>

<p>
</p>



<span id="example-requests-POSTejercicios">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/ejercicios" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"operation\": \"architecto\",
    \"planet_id\": \"architecto\",
    \"difficulty_id\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/ejercicios"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "operation": "architecto",
    "planet_id": "architecto",
    "difficulty_id": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTejercicios">
</span>
<span id="execution-results-POSTejercicios" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTejercicios"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTejercicios"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTejercicios" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTejercicios">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTejercicios" data-method="POST"
      data-path="ejercicios"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTejercicios', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTejercicios"
                    onclick="tryItOut('POSTejercicios');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTejercicios"
                    onclick="cancelTryOut('POSTejercicios');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTejercicios"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>ejercicios</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTejercicios"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTejercicios"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>operation</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="operation"                data-endpoint="POSTejercicios"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>planet_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planet_id"                data-endpoint="POSTejercicios"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the planets table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>difficulty_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="difficulty_id"                data-endpoint="POSTejercicios"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the dificulties table. Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETejercicios--ejercicio-">GET ejercicios/{ejercicio}</h2>

<p>
</p>



<span id="example-requests-GETejercicios--ejercicio-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/ejercicios/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/ejercicios/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETejercicios--ejercicio-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImpsR0tzemVoZk9YV21oU1dCa2pPZGc9PSIsInZhbHVlIjoiMWFoY3FoNTB2T1E0aHJqL2tLS3hnL0FCMzU4UmhkTVluM3Fwa2k5bDU5NkJOSnQ4bk5odTh2Y2Y5R0RFZC9iWnVLWERTaTh0RE1QN3p0VThuUytQUy91NVhkSmZjK0wvNjgzU3ZlT3FvOGU1VHVhT2V3bVFKYzlzQTN0UkZqNWMiLCJtYWMiOiJhMDAxNjRiZTk2M2I4NDlhZmY3Y2Q5ZTcyZTEzMWM2OTFhOWM2MmYxOGJkYTQ4MzYwZTRkNjJkZTMyMTg0ZjZmIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjVzZlM1S2FEK0w5R290aUx1cmZVdFE9PSIsInZhbHVlIjoiREZCOE9iUmxNbVkzQzRwa0o0bHhkdElkMTVBUjVGdCswOWpEZUlib1o5YnJwNkhrWkR6d1B1LzVyWHUvakZsaU9TeVgxcEZCZm5PWXBQMVg3WDdULzBGdE1aeGhJZEU1U1FFOWhYQWZ2WWJsSnNVT3dhdVNLZnBxUC8wc29pZUoiLCJtYWMiOiJlM2VjNjMwMjc1YmJiNThhOGNjODk1MDU3YjMzNmM2OWI5YTY2ZTEwMjIzZGEyZDVhNjY1Y2E5NDUzMzYxNzM3IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETejercicios--ejercicio-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETejercicios--ejercicio-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETejercicios--ejercicio-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETejercicios--ejercicio-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETejercicios--ejercicio-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETejercicios--ejercicio-" data-method="GET"
      data-path="ejercicios/{ejercicio}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETejercicios--ejercicio-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETejercicios--ejercicio-"
                    onclick="tryItOut('GETejercicios--ejercicio-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETejercicios--ejercicio-"
                    onclick="cancelTryOut('GETejercicios--ejercicio-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETejercicios--ejercicio-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>ejercicios/{ejercicio}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>ejercicio</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="ejercicio"                data-endpoint="GETejercicios--ejercicio-"
               value="architecto"
               data-component="url">
    <br>
<p>The ejercicio. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETejercicios--ejercicio--editar">GET ejercicios/{ejercicio}/editar</h2>

<p>
</p>



<span id="example-requests-GETejercicios--ejercicio--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/ejercicios/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/ejercicios/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETejercicios--ejercicio--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6Ik04UWp6VUpOTk1DRy9Vb3hUU0R5dWc9PSIsInZhbHVlIjoiYzVMeUxROVlQN1VtbEk3K2FQOHYvOXZxTE1Jd1lyMGl6SkNtWVJMaU5yM1VGSEVMNkJsbHpZUEpzSHM3VlhkYWR0bDVJTmxBSThCZ2djR2NVS0VnUnNuT094dzRQcDlRbStKMHN6UW1PcTBzeXdXL1pKS2NLV0FQT2p0WElGdWwiLCJtYWMiOiIyMjZiYjk3MDIwZDdlOGE0YThmMDIwOTQ3ODk4ZTE1NTYxODRmZDU4ZmVkZGZiOGQwNjg1MDUwZmUwOWZhOWM3IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImE1ZjBuTkxBMFpzOFBoR2trOHZ4MlE9PSIsInZhbHVlIjoia2lMU3BJNS9JY00rR3loam9uOVl1OVhWUWpqMk0vdzlDa1R2VFdaalU4UXR5Mlk2cFpoTGhhVTlaN0VlTTRqYlpkeVlxdWxuLzFmbC9MbzhSejlaMTZkY2tKZlhWL3YyV0lFVFJ0UFZvc1JLQ0JLU0hDWVl1YkRrZTQ4eHZwZ0siLCJtYWMiOiI2NmM1ZGUwMTBkMWNjNzJkYWNiNzVmZjJhODQ4YjE4MGU4Mjk1YTM2NDVmZjcxMWM2N2UzOTg3Yjk0MWYxM2UxIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETejercicios--ejercicio--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETejercicios--ejercicio--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETejercicios--ejercicio--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETejercicios--ejercicio--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETejercicios--ejercicio--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETejercicios--ejercicio--editar" data-method="GET"
      data-path="ejercicios/{ejercicio}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETejercicios--ejercicio--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETejercicios--ejercicio--editar"
                    onclick="tryItOut('GETejercicios--ejercicio--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETejercicios--ejercicio--editar"
                    onclick="cancelTryOut('GETejercicios--ejercicio--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETejercicios--ejercicio--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>ejercicios/{ejercicio}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETejercicios--ejercicio--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETejercicios--ejercicio--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>ejercicio</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="ejercicio"                data-endpoint="GETejercicios--ejercicio--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The ejercicio. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTejercicios--ejercicio-">PUT ejercicios/{ejercicio}</h2>

<p>
</p>



<span id="example-requests-PUTejercicios--ejercicio-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/ejercicios/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"operation\": \"architecto\",
    \"planet_id\": \"architecto\",
    \"difficulty_id\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/ejercicios/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "operation": "architecto",
    "planet_id": "architecto",
    "difficulty_id": "architecto"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTejercicios--ejercicio-">
</span>
<span id="execution-results-PUTejercicios--ejercicio-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTejercicios--ejercicio-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTejercicios--ejercicio-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTejercicios--ejercicio-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTejercicios--ejercicio-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTejercicios--ejercicio-" data-method="PUT"
      data-path="ejercicios/{ejercicio}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTejercicios--ejercicio-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTejercicios--ejercicio-"
                    onclick="tryItOut('PUTejercicios--ejercicio-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTejercicios--ejercicio-"
                    onclick="cancelTryOut('PUTejercicios--ejercicio-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTejercicios--ejercicio-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>ejercicios/{ejercicio}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>ejercicios/{ejercicio}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>ejercicio</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="ejercicio"                data-endpoint="PUTejercicios--ejercicio-"
               value="architecto"
               data-component="url">
    <br>
<p>The ejercicio. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>operation</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="operation"                data-endpoint="PUTejercicios--ejercicio-"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>planet_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planet_id"                data-endpoint="PUTejercicios--ejercicio-"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the planets table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>difficulty_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="difficulty_id"                data-endpoint="PUTejercicios--ejercicio-"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the dificulties table. Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEejercicios--ejercicio-">DELETE ejercicios/{ejercicio}</h2>

<p>
</p>



<span id="example-requests-DELETEejercicios--ejercicio-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/ejercicios/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/ejercicios/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEejercicios--ejercicio-">
</span>
<span id="execution-results-DELETEejercicios--ejercicio-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEejercicios--ejercicio-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEejercicios--ejercicio-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEejercicios--ejercicio-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEejercicios--ejercicio-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEejercicios--ejercicio-" data-method="DELETE"
      data-path="ejercicios/{ejercicio}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEejercicios--ejercicio-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEejercicios--ejercicio-"
                    onclick="tryItOut('DELETEejercicios--ejercicio-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEejercicios--ejercicio-"
                    onclick="cancelTryOut('DELETEejercicios--ejercicio-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEejercicios--ejercicio-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>ejercicios/{ejercicio}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>ejercicio</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="ejercicio"                data-endpoint="DELETEejercicios--ejercicio-"
               value="architecto"
               data-component="url">
    <br>
<p>The ejercicio. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETcartas">GET cartas</h2>

<p>
</p>



<span id="example-requests-GETcartas">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/cartas" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETcartas">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6InhzZVY0MG1FZ3luQk1mYmNvNUVRY2c9PSIsInZhbHVlIjoid3ZGMHE4UUxmQWVCMEx0SDBydkZGaWJoV25CNU1zSUFDdVppWXNyRzJXYkJtUFNSWnBPbU90dHJ2NGNuSUJCWXdrTXYwdTd4ZFRHeXZITnBEUStueDBaTmZsWitHZnBsaGRpbDAyWnpqSk91NUhBQ2NQajNER0F4S201QnZMVnciLCJtYWMiOiJiZGNhYmI4ZjRiNWQ4YjZlYjYwMzk2MDdlOGEyMWUxZmZhMjNlZTVjNmI2ODE1N2NmOTU4YTNlNzA2ZTRlNjRjIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Ik53NnIrRzkwNm5tMUh2U25FVTFIdHc9PSIsInZhbHVlIjoicE5JaGQ3TlZNYU8wYndENnF0ZjZtbVlvQ1RuNHd3Q2pJNDRYOXoxSVB6a2RWSGhPZWZncm00OE9MeTVSRWc2Rk5jVldCQWt0MnhnUUZ1TmFVSUphV1Z0cWJSa2owZkZ1Y05Rc2xQc2MraHpUVUR6czBkenhYWHF3SXBzaXUxVHoiLCJtYWMiOiIzMWY3YTdhYjAwYjI2Yzk3NTJiNGQxZDg4MGEwN2VjYWI3ZDhhOGU0MjhmODUyZjlkYTAxYWIwYmNiYWZhYjc0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETcartas" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETcartas"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETcartas"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETcartas" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETcartas">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETcartas" data-method="GET"
      data-path="cartas"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETcartas', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETcartas"
                    onclick="tryItOut('GETcartas');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETcartas"
                    onclick="cancelTryOut('GETcartas');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETcartas"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>cartas</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETcartas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETcartas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETcartas-crear">GET cartas/crear</h2>

<p>
</p>



<span id="example-requests-GETcartas-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/cartas/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETcartas-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6Ilg5dTNJdU8rME9FQXkxUUFHMk1vSXc9PSIsInZhbHVlIjoiWlZpNzAyZVd3MU53QUd6ekh3NDNwdjgxOGlOQ1krZEZXVndrUmRQOGxGcW9OMEpUSVlUZFUycllEa3Q2Yk0zYTREOE03UWl4VEhjYW00cFIvNmNrNUdVMm9YTmZYc3J5YzdQWWpZOU9ZVlE0d2xiOHpMenFoSm1ISGVCdmx3R0IiLCJtYWMiOiI0M2QxMDI5ZmMyYmEzNmNmNjJkMmY0YWU1YjBmZmFlMzViNmJlNWZhZWU1MzE2YTEyMGI4YTQ1YWFmYmZlNzVlIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjA1OHdoOFZBZ2h3SFRqZkx6ei9mWmc9PSIsInZhbHVlIjoiSWZlTmpFdlBBdXF4Nng3M3I5Si9DMis4Sjc0QWlPTDR3UjBRSWJuM01ZbjZEYnQyaTNnTk9UNmRhZWdzS0pEbytSc3VwWmFaVDlxbWZrcXhGeTJMcXlKOGN4QStWSzF0ODhQaURrVEpEeGxaUHdlN0xjTlVyeEFBYzEyTnRTUjIiLCJtYWMiOiJkM2I2ZjM3ZGIzMTM5MmMyOGQ5ZjY0YTFmODgxZWQyYjYyZjE4MmIyMDc5MjRlYWE4YTliM2NmYzA4YjkzOGM2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETcartas-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETcartas-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETcartas-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETcartas-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETcartas-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETcartas-crear" data-method="GET"
      data-path="cartas/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETcartas-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETcartas-crear"
                    onclick="tryItOut('GETcartas-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETcartas-crear"
                    onclick="cancelTryOut('GETcartas-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETcartas-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>cartas/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETcartas-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETcartas-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTcartas">POST cartas</h2>

<p>
</p>



<span id="example-requests-POSTcartas">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/cartas" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"energy_cost\": 39,
    \"stats\": 84,
    \"type_id\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "energy_cost": 39,
    "stats": 84,
    "type_id": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTcartas">
</span>
<span id="execution-results-POSTcartas" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTcartas"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTcartas"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTcartas" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTcartas">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTcartas" data-method="POST"
      data-path="cartas"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTcartas', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTcartas"
                    onclick="tryItOut('POSTcartas');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTcartas"
                    onclick="cancelTryOut('POSTcartas');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTcartas"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>cartas</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTcartas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTcartas"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTcartas"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>energy_cost</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="energy_cost"                data-endpoint="POSTcartas"
               value="39"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>39</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>stats</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="stats"                data-endpoint="POSTcartas"
               value="84"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>84</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>type_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="type_id"                data-endpoint="POSTcartas"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>_id</code> of an existing record in the type_cards table. Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETcartas--carta-">GET cartas/{carta}</h2>

<p>
</p>



<span id="example-requests-GETcartas--carta-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/cartas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETcartas--carta-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImFtRlV0VEx6WVBoS2ZIMjEyWTNwRnc9PSIsInZhbHVlIjoidmlUYXpuMjVVaXJzenl2V3ZGWGtFYTlJanRrTHo3UElYUitVMDFmbzNlYWJxM05QQmVvQUF4V2ZDSzBnQWdlZHBvamZqTUh1eFdZcFlwNldjYWo2eDBtZ20xUVZnRFVIQVFhbUdmalNsWEVETlNxSGJJaEhuTFA0MDErMXZLL3ciLCJtYWMiOiJlNThlMzQ3YTgwOGYzMzBmODRkYjA2NjljYTA1ODExNDAwMWVkODZmYTZhMzMyNzY5ZWExMjA5YzExYTZmMjBiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IlhpZnpUQ1JEeFV2ZXp3Q0J2Lzd5L3c9PSIsInZhbHVlIjoiYnUzbjV4TWppdnd0WXk1K1Q5RlpiNVBuR1VTUU16Ry81U1QxWnhpYkhOL0VCZjRDNnJNdWxlYzJYaTluTzBkNDE2c2tQa3F4Tm44RWdRK3Z4SEZLalMzZnVpdmJzS3M0VjJ5SmsxamYwemFrS1BOaFVTZm90TjZyNTA2ZmVueVEiLCJtYWMiOiJhOTBkMjBjYzdjY2NhNTdlOTg3ZTNlZWI5NWY3NmI5OTIyZWU4M2ViMzkwMTI2MmU5N2U1NmYwNTFjYjIzNjViIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETcartas--carta-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETcartas--carta-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETcartas--carta-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETcartas--carta-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETcartas--carta-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETcartas--carta-" data-method="GET"
      data-path="cartas/{carta}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETcartas--carta-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETcartas--carta-"
                    onclick="tryItOut('GETcartas--carta-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETcartas--carta-"
                    onclick="cancelTryOut('GETcartas--carta-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETcartas--carta-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>cartas/{carta}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETcartas--carta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETcartas--carta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>carta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="carta"                data-endpoint="GETcartas--carta-"
               value="architecto"
               data-component="url">
    <br>
<p>The carta. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETcartas--carta--editar">GET cartas/{carta}/editar</h2>

<p>
</p>



<span id="example-requests-GETcartas--carta--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/cartas/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETcartas--carta--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6Ikhpc3NaRDVVWTBaZVRWQ0tKazBtMHc9PSIsInZhbHVlIjoid09WL3BJekVLL1JCL2x6ck9sQ3hENGNLeWtleHpIb1JzLzV5MnJmaUc1UHEyRnRGWkFTNXczK0t5MXdLM3VSZ0xJaGxpNkpGRUorWVlrQVNqcCswMlVJT3B6aFNGNStWUmI2dVIyQ0VXMVFRN3RKZFdBT25JSmV6Q1YrOXBKRlEiLCJtYWMiOiI3MTZmZGY5YjE4NjFiMjFkMWNlOTI0MWU3MTJiMTQzMzRlOWE0ZGFiN2ZlY2EyZGYxYzNmZWQ3YjhiNDY3MjhhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImxPWitTNUxIK242RVNhd0IzaEl6NVE9PSIsInZhbHVlIjoiZmNzVzl1U1FIckYwUkFVQ252eU9ISjhIeFpFWDNITFU1aS9TdmRWb3piSUx2YUFIK1cybjBlM1B1Q1d2RlI2c3BxS3MyRWdETU8wQ1RVMWgxWDBaNXFEWmUxVElLNEJHT01zSU52c1ZWbU41eDRBWlNzb0lsbHNtb3pmTm1jSjQiLCJtYWMiOiIzZjUwODJjNDNiYWQ0OTRmNTlmYTViZjVhMTdjNWYwYTI4OWRlODcxMDFjMDQzMWQ0MTQzODQ3ZTE1ZDFjYjk0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETcartas--carta--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETcartas--carta--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETcartas--carta--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETcartas--carta--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETcartas--carta--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETcartas--carta--editar" data-method="GET"
      data-path="cartas/{carta}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETcartas--carta--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETcartas--carta--editar"
                    onclick="tryItOut('GETcartas--carta--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETcartas--carta--editar"
                    onclick="cancelTryOut('GETcartas--carta--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETcartas--carta--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>cartas/{carta}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETcartas--carta--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETcartas--carta--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>carta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="carta"                data-endpoint="GETcartas--carta--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The carta. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTcartas--carta-">PUT cartas/{carta}</h2>

<p>
</p>



<span id="example-requests-PUTcartas--carta-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/cartas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"energy_cost\": 27,
    \"stats\": 39,
    \"type_id\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "energy_cost": 27,
    "stats": 39,
    "type_id": "architecto"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTcartas--carta-">
</span>
<span id="execution-results-PUTcartas--carta-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTcartas--carta-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTcartas--carta-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTcartas--carta-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTcartas--carta-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTcartas--carta-" data-method="PUT"
      data-path="cartas/{carta}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTcartas--carta-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTcartas--carta-"
                    onclick="tryItOut('PUTcartas--carta-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTcartas--carta-"
                    onclick="cancelTryOut('PUTcartas--carta-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTcartas--carta-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>cartas/{carta}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>cartas/{carta}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTcartas--carta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTcartas--carta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>carta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="carta"                data-endpoint="PUTcartas--carta-"
               value="architecto"
               data-component="url">
    <br>
<p>The carta. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTcartas--carta-"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>energy_cost</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="energy_cost"                data-endpoint="PUTcartas--carta-"
               value="27"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>27</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>stats</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="stats"                data-endpoint="PUTcartas--carta-"
               value="39"
               data-component="body">
    <br>
<p>Must be at least 0. Example: <code>39</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>type_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="type_id"                data-endpoint="PUTcartas--carta-"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>_id</code> of an existing record in the type_cards table. Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEcartas--carta-">DELETE cartas/{carta}</h2>

<p>
</p>



<span id="example-requests-DELETEcartas--carta-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/cartas/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEcartas--carta-">
</span>
<span id="execution-results-DELETEcartas--carta-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEcartas--carta-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEcartas--carta-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEcartas--carta-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEcartas--carta-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEcartas--carta-" data-method="DELETE"
      data-path="cartas/{carta}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEcartas--carta-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEcartas--carta-"
                    onclick="tryItOut('DELETEcartas--carta-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEcartas--carta-"
                    onclick="cancelTryOut('DELETEcartas--carta-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEcartas--carta-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>cartas/{carta}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEcartas--carta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEcartas--carta-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>carta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="carta"                data-endpoint="DELETEcartas--carta-"
               value="architecto"
               data-component="url">
    <br>
<p>The carta. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTcartas--carta--ejercicios--ejercicio-">POST cartas/{carta}/ejercicios/{ejercicio}</h2>

<p>
</p>



<span id="example-requests-POSTcartas--carta--ejercicios--ejercicio-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/cartas/architecto/ejercicios/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas/architecto/ejercicios/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTcartas--carta--ejercicios--ejercicio-">
</span>
<span id="execution-results-POSTcartas--carta--ejercicios--ejercicio-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTcartas--carta--ejercicios--ejercicio-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTcartas--carta--ejercicios--ejercicio-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTcartas--carta--ejercicios--ejercicio-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTcartas--carta--ejercicios--ejercicio-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTcartas--carta--ejercicios--ejercicio-" data-method="POST"
      data-path="cartas/{carta}/ejercicios/{ejercicio}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTcartas--carta--ejercicios--ejercicio-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTcartas--carta--ejercicios--ejercicio-"
                    onclick="tryItOut('POSTcartas--carta--ejercicios--ejercicio-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTcartas--carta--ejercicios--ejercicio-"
                    onclick="cancelTryOut('POSTcartas--carta--ejercicios--ejercicio-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTcartas--carta--ejercicios--ejercicio-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>cartas/{carta}/ejercicios/{ejercicio}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTcartas--carta--ejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTcartas--carta--ejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>carta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="carta"                data-endpoint="POSTcartas--carta--ejercicios--ejercicio-"
               value="architecto"
               data-component="url">
    <br>
<p>The carta. Example: <code>architecto</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>ejercicio</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="ejercicio"                data-endpoint="POSTcartas--carta--ejercicios--ejercicio-"
               value="architecto"
               data-component="url">
    <br>
<p>The ejercicio. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-DELETEcartas--carta--ejercicios--ejercicio-">DELETE cartas/{carta}/ejercicios/{ejercicio}</h2>

<p>
</p>



<span id="example-requests-DELETEcartas--carta--ejercicios--ejercicio-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/cartas/architecto/ejercicios/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/cartas/architecto/ejercicios/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEcartas--carta--ejercicios--ejercicio-">
</span>
<span id="execution-results-DELETEcartas--carta--ejercicios--ejercicio-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEcartas--carta--ejercicios--ejercicio-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEcartas--carta--ejercicios--ejercicio-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEcartas--carta--ejercicios--ejercicio-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEcartas--carta--ejercicios--ejercicio-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEcartas--carta--ejercicios--ejercicio-" data-method="DELETE"
      data-path="cartas/{carta}/ejercicios/{ejercicio}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEcartas--carta--ejercicios--ejercicio-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEcartas--carta--ejercicios--ejercicio-"
                    onclick="tryItOut('DELETEcartas--carta--ejercicios--ejercicio-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEcartas--carta--ejercicios--ejercicio-"
                    onclick="cancelTryOut('DELETEcartas--carta--ejercicios--ejercicio-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEcartas--carta--ejercicios--ejercicio-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>cartas/{carta}/ejercicios/{ejercicio}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEcartas--carta--ejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEcartas--carta--ejercicios--ejercicio-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>carta</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="carta"                data-endpoint="DELETEcartas--carta--ejercicios--ejercicio-"
               value="architecto"
               data-component="url">
    <br>
<p>The carta. Example: <code>architecto</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>ejercicio</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="ejercicio"                data-endpoint="DELETEcartas--carta--ejercicios--ejercicio-"
               value="architecto"
               data-component="url">
    <br>
<p>The ejercicio. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETpasos">GET pasos</h2>

<p>
</p>



<span id="example-requests-GETpasos">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/pasos" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/pasos"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETpasos">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlBkbEUrY0lmRkw3UWVSY095bVpIU3c9PSIsInZhbHVlIjoiaW1KQnVMTVp1QUo5VytpNzRpVVMzdGpiRFllV2pGWVFSWHR4cjZOOXVSekxMUXlZbGxZZm9VQ0hYd2h1R2l5YnoyN2RvTGNyMUtTY2xEQ1diN2xQNVFSS2l6NmhHTDNNNmZOb0w3RUZqQ1UzMkdYbFRnV0FSUHpCbXBVS0JabVIiLCJtYWMiOiJhMmJiZDU0YzQ2ZjI0Y2EzYTk5MjI5MzFkNjExNTM4NjljNWE2MTRmNjkzYjdkNGRiMTVhNzM1MGNjNmUyNmU3IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InJoTENvMnorZE9zNTdOKzQ3ZGJXQXc9PSIsInZhbHVlIjoiOGJHdTl5K0xYUEhJcDVwbnpYZ3h6TlZ4OXJqQWFlekNXbGFiM2J2Q241QWF6ckhmK202M2luMERzQW5pQUduTG56SXA3Wnh2eDhMSDgrUlNSRGZHOG1pdVpLTjl6T3ZJdTFkS3g5eFhUM0pJcXpMZm11NmFCMFdMRHhjdG1sNSsiLCJtYWMiOiI1ZGMwZDQwOTBhY2E5NjNiYzcyNzliMjIwZDYyYjQ1MmQyNDc4ZjM0ZDU3NDEwOTU1MDZhZDhjZDc5NTI1YmJhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETpasos" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETpasos"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETpasos"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETpasos" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETpasos">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETpasos" data-method="GET"
      data-path="pasos"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETpasos', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETpasos"
                    onclick="tryItOut('GETpasos');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETpasos"
                    onclick="cancelTryOut('GETpasos');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETpasos"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>pasos</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETpasos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETpasos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETpasos-crear">GET pasos/crear</h2>

<p>
</p>



<span id="example-requests-GETpasos-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/pasos/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/pasos/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETpasos-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IjdhR1V0NkRHbjhidDBXL1lua2Qrd0E9PSIsInZhbHVlIjoiUjl0bWg3VkdOc1AvYVVXaGhBc2ZCL2RkUG9EQTF5NlgyNEdIa2tSSURpR1FOanFBUWowNWVEWDhZT1BzY2J6U0ZxTlhSbHhvQ2g0am5mV2N3TDZReTZpcHBzVDE2TGVFRlZFSHNuY1k2ZHp5UU13SW4rNmFOU2d0aVBaR2dsWTEiLCJtYWMiOiIwNWQ2NDc5YWZjNGM3NGMwYzY5YWM2YzRiMDFkNWY2OTlmYmViYTYzMTkzZGFmMWVlNTBhOGFiZTkyOTFiMDdmIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Ikt5YTYxU2NUSjUzYy9aV2xja0ZvOGc9PSIsInZhbHVlIjoiM1dpRWdOWEhOaTdlaUhrWjJGSnFZRVROZ0JLSW5aK2tkRmdsR1F6OW4zcjVXTXVYWFNjc2lXaDNJaDNqTGh5Rlg4MHJqQ0F0NVNSckV0cU9JVkNQUlcvdlRkenJReDRQMDNTeXc0OXBqcTlibjZrWGI0WktUK2poVllPWmVsK04iLCJtYWMiOiJhZWVmZmEzMTM0NTMyMmEwOTE5NzRjMTQ3MTU0MjU5Yzg0ZDMxOWM3MDMzY2Y2MmUzNTBkOTg4NzZlN2Q2Y2JjIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:37 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETpasos-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETpasos-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETpasos-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETpasos-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETpasos-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETpasos-crear" data-method="GET"
      data-path="pasos/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETpasos-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETpasos-crear"
                    onclick="tryItOut('GETpasos-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETpasos-crear"
                    onclick="cancelTryOut('GETpasos-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETpasos-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>pasos/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETpasos-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETpasos-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTpasos">POST pasos</h2>

<p>
</p>



<span id="example-requests-POSTpasos">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/pasos" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"exercise_id\": \"architecto\",
    \"order\": 16
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/pasos"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "exercise_id": "architecto",
    "order": 16
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTpasos">
</span>
<span id="execution-results-POSTpasos" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTpasos"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTpasos"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTpasos" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTpasos">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTpasos" data-method="POST"
      data-path="pasos"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTpasos', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTpasos"
                    onclick="tryItOut('POSTpasos');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTpasos"
                    onclick="cancelTryOut('POSTpasos');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTpasos"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>pasos</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTpasos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTpasos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>exercise_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="exercise_id"                data-endpoint="POSTpasos"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the exercises table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>order</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="order"                data-endpoint="POSTpasos"
               value="16"
               data-component="body">
    <br>
<p>Example: <code>16</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETpasos--paso-">GET pasos/{paso}</h2>

<p>
</p>



<span id="example-requests-GETpasos--paso-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/pasos/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/pasos/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETpasos--paso-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlY4Z2FRVlFLU3FOQzB0STM0ZDNoMEE9PSIsInZhbHVlIjoicStiMXV1bGdFT0dNbDJFV2l6MFNMb0pJUnVmS2pZU0F2WUh0c0NNa01TU2lUUStjU2Jza05nd3N6ODZOUnkrQkNwMG50Nmp3bDdNUkRlRE92M2t4dVR3NUNZczFtSkhPZ3ZQVTVSOXMvUEpxdjFiUGZrZ1FTc1pOdFlDL2tFOC8iLCJtYWMiOiI3ZjUzNzZkYTI4YzljZTE0ZDBhMmY1ZmEzMzExYTU0NGZiZGY1ZjQzZTRmMDZiNWUwMjg1NTA3YTk2MTQ2OTE5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjlpSy9IQ1ZqdU5NS09IbEl0OFY0K3c9PSIsInZhbHVlIjoiZG1NMkMwZjZnUUc2Q3NqR2tWdVhwYlIzbmJiRFRqbmFZL3o0RnNHZnhEbkxyb3dmUWZwRktSWERSbmJRQlRGZ0hKczBzRnoyTG9DWWw5QTF3eG5ZNlZXcFkvQ0lJeGhGeHhxTWlaNzB5RUp0ZjZEam8ydkl0Z2gxYzRtN0NYQXQiLCJtYWMiOiI5NWNlZjI2MTYwZDMwYjRlMWI3NTdkYWE2OTU2NmJiNzBiNjY0NjVmY2U0M2VjMzlmMmM2MjYyOTQyODY5NzQzIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETpasos--paso-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETpasos--paso-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETpasos--paso-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETpasos--paso-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETpasos--paso-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETpasos--paso-" data-method="GET"
      data-path="pasos/{paso}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETpasos--paso-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETpasos--paso-"
                    onclick="tryItOut('GETpasos--paso-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETpasos--paso-"
                    onclick="cancelTryOut('GETpasos--paso-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETpasos--paso-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>pasos/{paso}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETpasos--paso-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETpasos--paso-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>paso</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="paso"                data-endpoint="GETpasos--paso-"
               value="architecto"
               data-component="url">
    <br>
<p>The paso. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETpasos--paso--editar">GET pasos/{paso}/editar</h2>

<p>
</p>



<span id="example-requests-GETpasos--paso--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/pasos/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/pasos/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETpasos--paso--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImZ0M2JCT29VeVBVczVKN1pyaVNlWGc9PSIsInZhbHVlIjoiVnlhQjlzbktHK1YzZlV1K1lCbWhFbjRrUUVlYTQxanBwOTNCUTRDUHM5TmhTanc1NUVJY3lOVVBPcGVUSE82NXkrV0FUbzJLZ2EreXJleWFzekJKbm5vZGxZRXBqT0JuTWVWNzZUSHE2OGN4WWZqbWN5Qm95WWxWNkhsU2ljY1QiLCJtYWMiOiIxNmEyMGI2YmIxMzQwZDFlMGJlMDcyMjM2YzU5MTk4OTg1MjA0OWZmZmI4YjBiNWY4NjA0M2QwNDU3ZWZhMDdiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Ik0vckpmM2lFY0ZLRC9nSzd1VDU4clE9PSIsInZhbHVlIjoiUU9oc3JCaVQwNkJCYllaZnVncFpETXpQQWFJdU1IQ0RCdHF1bWExbHg4Q2RGU2JtUnVPeVVwNG91Y0ZKcHVFdDNSTkQweEJYVGEvelB0M3pDd1cvNDFkWi9LeHNoL2ZXeC9GaGZtemhIRkJaSjhySUU1RXdvNnJBNmhBNC9YeGciLCJtYWMiOiJlYmVmNDUxZTFlODRiZWMwN2M4YzgwZTA1MjZlOTQ4OGQ3MWM1YWJlNzdmMmVkZTIzN2ExYWFhM2FmYTgzZWRmIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETpasos--paso--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETpasos--paso--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETpasos--paso--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETpasos--paso--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETpasos--paso--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETpasos--paso--editar" data-method="GET"
      data-path="pasos/{paso}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETpasos--paso--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETpasos--paso--editar"
                    onclick="tryItOut('GETpasos--paso--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETpasos--paso--editar"
                    onclick="cancelTryOut('GETpasos--paso--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETpasos--paso--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>pasos/{paso}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETpasos--paso--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETpasos--paso--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>paso</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="paso"                data-endpoint="GETpasos--paso--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The paso. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTpasos--paso-">PUT pasos/{paso}</h2>

<p>
</p>



<span id="example-requests-PUTpasos--paso-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/pasos/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/pasos/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "PUT",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTpasos--paso-">
</span>
<span id="execution-results-PUTpasos--paso-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTpasos--paso-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTpasos--paso-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTpasos--paso-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTpasos--paso-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTpasos--paso-" data-method="PUT"
      data-path="pasos/{paso}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTpasos--paso-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTpasos--paso-"
                    onclick="tryItOut('PUTpasos--paso-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTpasos--paso-"
                    onclick="cancelTryOut('PUTpasos--paso-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTpasos--paso-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>pasos/{paso}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>pasos/{paso}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTpasos--paso-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTpasos--paso-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>paso</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="paso"                data-endpoint="PUTpasos--paso-"
               value="architecto"
               data-component="url">
    <br>
<p>The paso. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-DELETEpasos--paso-">DELETE pasos/{paso}</h2>

<p>
</p>



<span id="example-requests-DELETEpasos--paso-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/pasos/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/pasos/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEpasos--paso-">
</span>
<span id="execution-results-DELETEpasos--paso-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEpasos--paso-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEpasos--paso-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEpasos--paso-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEpasos--paso-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEpasos--paso-" data-method="DELETE"
      data-path="pasos/{paso}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEpasos--paso-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEpasos--paso-"
                    onclick="tryItOut('DELETEpasos--paso-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEpasos--paso-"
                    onclick="cancelTryOut('DELETEpasos--paso-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEpasos--paso-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>pasos/{paso}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEpasos--paso-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEpasos--paso-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>paso</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="paso"                data-endpoint="DELETEpasos--paso-"
               value="architecto"
               data-component="url">
    <br>
<p>The paso. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETopciones">GET opciones</h2>

<p>
</p>



<span id="example-requests-GETopciones">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/opciones" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/opciones"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETopciones">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlpBeUlCZDczZE0rdjRLd3hyS0tCcGc9PSIsInZhbHVlIjoiNit3dHZWZjVxbXlpZ0JEOXBBT2hZVWpqQ0V4WTN2MWxxTjlQUGVxb0xqTDB3TmZjdEdJQzREMy9LMmFFQlcvOGZuK1l0SE0zaGc4Q0N3TS9UVFpQcUN5cm5sMHBVYXd3TXZwWVkxQU1CUmhjU2ZmVkpNYUxjMjRmRWxQZ0JwZngiLCJtYWMiOiIyZGY0NThlMjMzOTM3NjE1MjRlNmExYzM1OGM0M2FhMGRlNmJkZmU3NGQ3M2E1OTQwZjA2MTg1YzNjODdlYzY5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IndodE9oazB0cEczeStKQ04xUTduVWc9PSIsInZhbHVlIjoiaFBQOFJubG1FVkFkQ1dWTjBEOHIxczVRdkZmZkVqVlFMc0dMTkN4QVZFelpVclRkbldXVGc4ait3eDNtOWExOGRCdVovTkduU0hIeGE1K2JMSkgya1cxVDNNQzVvWTJIRTI4Mm1hcWxFVXF0WnV3ekg3WXBPOGQzV3pVRjAydDYiLCJtYWMiOiJjNDJkMjg4MTE0ZDhiZGY4ODM2ODhhYjJjMjQ0NmZjZDM3OTdkZWY0NWZiMDEyN2E4Y2YxYmJhYjU3Yzc0YjBjIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETopciones" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETopciones"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETopciones"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETopciones" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETopciones">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETopciones" data-method="GET"
      data-path="opciones"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETopciones', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETopciones"
                    onclick="tryItOut('GETopciones');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETopciones"
                    onclick="cancelTryOut('GETopciones');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETopciones"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>opciones</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETopciones"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETopciones"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETopciones-crear">GET opciones/crear</h2>

<p>
</p>



<span id="example-requests-GETopciones-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/opciones/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/opciones/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETopciones-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImZRem5jeUFQMUhrb0VTL0dwQjMvYXc9PSIsInZhbHVlIjoidy9ubmRnNjNTbFZrK29ha1QzZmVkZzRVRE9nWnFNYzhteTFISnZzM2UxeG5KUmRIRW5pSGhvZ1ZiQ0hacGc5ek5Kckt6M2hvYm1PL1VHdWFjYUVrcVJzVGpiL3d1ZWdzRUlGckx6VHV3VHVyS0pyZzB6TUttcUh0M2xWdU5xeU0iLCJtYWMiOiJkMjJkNTg5NDNhZWVjYmVjYTRiZjZhNjhlODUyYTdkMWE0MWMyNzBhOGE4ODQwODEwMjFhNDFlNTcwZjBhYzExIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImlGeHpTa3RVVThMTDJySkpETmhsdFE9PSIsInZhbHVlIjoiMXU0eXVqQTRPampzdHVaMERBTitXRHQ3WjMzUG5zTVNYRjdBaDlMVHF6RXMyOEVjSTJFSXRjMUJEV0hFMU9HNkRJQUt6ZTFiNkJVMGJOc214c0JNNjNsaytHK1Z4bmxRYlM0RmFPUnljZUpENDhwMXJYZERJUHovNnd4V1JBTXEiLCJtYWMiOiJlMzMzODU3NjQzZTIxY2FmODc2ZjY4NTE0NWZiNjU3MzlhNGNlMTQyMWU1YTA0ZDlkM2UxMGUwZjAxYmMyMTI5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETopciones-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETopciones-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETopciones-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETopciones-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETopciones-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETopciones-crear" data-method="GET"
      data-path="opciones/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETopciones-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETopciones-crear"
                    onclick="tryItOut('GETopciones-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETopciones-crear"
                    onclick="cancelTryOut('GETopciones-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETopciones-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>opciones/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETopciones-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETopciones-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTopciones">POST opciones</h2>

<p>
</p>



<span id="example-requests-POSTopciones">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/opciones" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"step_id\": \"architecto\",
    \"result\": \"architecto\",
    \"is_correct\": false
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/opciones"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "step_id": "architecto",
    "result": "architecto",
    "is_correct": false
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTopciones">
</span>
<span id="execution-results-POSTopciones" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTopciones"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTopciones"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTopciones" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTopciones">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTopciones" data-method="POST"
      data-path="opciones"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTopciones', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTopciones"
                    onclick="tryItOut('POSTopciones');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTopciones"
                    onclick="cancelTryOut('POSTopciones');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTopciones"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>opciones</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTopciones"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTopciones"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>step_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="step_id"                data-endpoint="POSTopciones"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the steps table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>result</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="result"                data-endpoint="POSTopciones"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_correct</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
 &nbsp;
                <label data-endpoint="POSTopciones" style="display: none">
            <input type="radio" name="is_correct"
                   value="true"
                   data-endpoint="POSTopciones"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="POSTopciones" style="display: none">
            <input type="radio" name="is_correct"
                   value="false"
                   data-endpoint="POSTopciones"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>false</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETopciones--opcione-">GET opciones/{opcione}</h2>

<p>
</p>



<span id="example-requests-GETopciones--opcione-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/opciones/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/opciones/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETopciones--opcione-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlgzNmxWNHFML1VkTHpiczlzYUU5MVE9PSIsInZhbHVlIjoiajBLTy9LQk5oUjBJcmozZ2I2NzFybnlSVVpNMVFiVUNMcHMyajN3NzFGd1FKZklPcHNmR2p5TS9RRVBSMUc4NlBQTmdGcTYwNFAweHpuSjJqSG9XcWdVTkozYjhvSE0xZjl1SXRTNnhwREdlU2xCSFp6WVBKa3BMOGIrY3YzVSsiLCJtYWMiOiI2MzkzODgyYWFhZWNhMTM3Nzg4NjQwY2QzMWY5YzM0NWFmZDZiMTgwNGUwMjM0MWNhYmYyOTQzOTQ0YmI5NTUyIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImpCYVVUeU1zd1NkSlRRdmNEU0dkQ2c9PSIsInZhbHVlIjoiT2p2Qjl6L3VxU0JzOHVuUVBLSGs3aVJOZEp2dzR4akVYSG5lMUp0T3pMWkhsRnNPcm9KWlE3QzkwMWpmbUZKYWh6RlQ0R09lU0N2M3JEYzBENHozTXh5cXViM0NRenhacGllRm1uTTZjb3VIT01hVHpkbWtqSnZFUnpqYk0yVTUiLCJtYWMiOiJjNzA4NTgyOWEwY2I0N2NjMTNiYmViODI2Yjk2MWMzODRiNjAxODhlNmFiYTIwZmFjYzU3MGI0MjgwNjU4ZDQ2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETopciones--opcione-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETopciones--opcione-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETopciones--opcione-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETopciones--opcione-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETopciones--opcione-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETopciones--opcione-" data-method="GET"
      data-path="opciones/{opcione}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETopciones--opcione-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETopciones--opcione-"
                    onclick="tryItOut('GETopciones--opcione-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETopciones--opcione-"
                    onclick="cancelTryOut('GETopciones--opcione-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETopciones--opcione-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>opciones/{opcione}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETopciones--opcione-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETopciones--opcione-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>opcione</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="opcione"                data-endpoint="GETopciones--opcione-"
               value="architecto"
               data-component="url">
    <br>
<p>The opcione. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETopciones--opcione--editar">GET opciones/{opcione}/editar</h2>

<p>
</p>



<span id="example-requests-GETopciones--opcione--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/opciones/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/opciones/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETopciones--opcione--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkR5V1JuVC9ycmJCbjdhS3QrY3pPaHc9PSIsInZhbHVlIjoicmpQamVXUE5lNkVXWC9RT0xpYzdFb05zakJ5MWIzdjlaMm02NkRjbmt4TG9GMHNUTHlNbDlyWEdZWndkMldFQmZXa3JiTmhwU1h2OWZRRE5icXB6bkxCYjJVbjkvbmdGaEtyWXpyT0pzRjk5aWgyMDZOWG02akYyVGFpNW9oUUwiLCJtYWMiOiJhMjM1NzZiN2M4ZjcyYjkzNGNhMjAzZjE2ZmFmMGM2ZjAzMzVkODM0YTVlNzUzOGQ2ZTNkYTUxNTY2MzJjM2M5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IllVNEI5MWxzQlNBaVZOZWcyNVY1Q0E9PSIsInZhbHVlIjoiWHA2MkFJLzlMMHpWaUc5TWlYd2JEWjNxSnBvZXlnaFJkUmwzckIxZGNCdUV2emNuQzVXbjNDclFLbThCWFJDRjZVNXh2am13dmo4TmRmTVB3MVlRVUZ6Um1GSE1PMmlvVWt4Z21QVnZlWlA2NFJaQUl2ajVQcmJtelhpdXNWTHEiLCJtYWMiOiI5OWZhZTY3ZGFmMjFkMTZlZDBjZGJmZGRiM2RjYjY3MmZjNDg3Y2FlMGY4MjQzZTQ3ZTBjOTRhZWQzZGZjNGNhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETopciones--opcione--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETopciones--opcione--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETopciones--opcione--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETopciones--opcione--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETopciones--opcione--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETopciones--opcione--editar" data-method="GET"
      data-path="opciones/{opcione}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETopciones--opcione--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETopciones--opcione--editar"
                    onclick="tryItOut('GETopciones--opcione--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETopciones--opcione--editar"
                    onclick="cancelTryOut('GETopciones--opcione--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETopciones--opcione--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>opciones/{opcione}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETopciones--opcione--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETopciones--opcione--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>opcione</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="opcione"                data-endpoint="GETopciones--opcione--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The opcione. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTopciones--opcione-">PUT opciones/{opcione}</h2>

<p>
</p>



<span id="example-requests-PUTopciones--opcione-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/opciones/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"result\": \"architecto\",
    \"is_correct\": true
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/opciones/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "result": "architecto",
    "is_correct": true
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTopciones--opcione-">
</span>
<span id="execution-results-PUTopciones--opcione-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTopciones--opcione-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTopciones--opcione-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTopciones--opcione-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTopciones--opcione-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTopciones--opcione-" data-method="PUT"
      data-path="opciones/{opcione}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTopciones--opcione-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTopciones--opcione-"
                    onclick="tryItOut('PUTopciones--opcione-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTopciones--opcione-"
                    onclick="cancelTryOut('PUTopciones--opcione-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTopciones--opcione-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>opciones/{opcione}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>opciones/{opcione}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTopciones--opcione-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTopciones--opcione-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>opcione</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="opcione"                data-endpoint="PUTopciones--opcione-"
               value="architecto"
               data-component="url">
    <br>
<p>The opcione. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>result</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="result"                data-endpoint="PUTopciones--opcione-"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_correct</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
 &nbsp;
                <label data-endpoint="PUTopciones--opcione-" style="display: none">
            <input type="radio" name="is_correct"
                   value="true"
                   data-endpoint="PUTopciones--opcione-"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="PUTopciones--opcione-" style="display: none">
            <input type="radio" name="is_correct"
                   value="false"
                   data-endpoint="PUTopciones--opcione-"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>true</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEopciones--opcione-">DELETE opciones/{opcione}</h2>

<p>
</p>



<span id="example-requests-DELETEopciones--opcione-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/opciones/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/opciones/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEopciones--opcione-">
</span>
<span id="execution-results-DELETEopciones--opcione-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEopciones--opcione-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEopciones--opcione-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEopciones--opcione-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEopciones--opcione-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEopciones--opcione-" data-method="DELETE"
      data-path="opciones/{opcione}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEopciones--opcione-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEopciones--opcione-"
                    onclick="tryItOut('DELETEopciones--opcione-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEopciones--opcione-"
                    onclick="cancelTryOut('DELETEopciones--opcione-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEopciones--opcione-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>opciones/{opcione}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEopciones--opcione-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEopciones--opcione-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>opcione</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="opcione"                data-endpoint="DELETEopciones--opcione-"
               value="architecto"
               data-component="url">
    <br>
<p>The opcione. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETenemigos">GET enemigos</h2>

<p>
</p>



<span id="example-requests-GETenemigos">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/enemigos" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/enemigos"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETenemigos">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlQ1c3R5YWhhOVdpbS8wQTBFbGFYcFE9PSIsInZhbHVlIjoiY1VnVGI2Q0tDY3FwYlNTYWdLN2FwSXNmL0oycjZZSms3R2liN056YnZHRlFNTEdHOTVDd1Mrb3RkMVFHeEVMNjZ4MVd4NHpiWkNnSGx1Z1BWSUhlK3UwYzFEdlZIQlRKTDhXa1RtRzRZRzJnbHRNbm5zMG1rdzVIVjM4UGoySWwiLCJtYWMiOiIyN2M5M2ZhMzFlMmQ1NTcxMDc5YmYwYzI2MGJlY2RhZmIzODQ2ZDAxMzBjYTdjZjNiMWNkYjNjZTRiYWQ3YjdiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InkrbWZJMFk0aEZpY2orK042Y3AydVE9PSIsInZhbHVlIjoiMWJJQndNbVJPamFmREZSZ21IaE9CY2p6ZHYvYWhMWk9XaHlXbG9ldkZOdGo1ZDFvUERqbzFDTjlCVDhDYmNqVEdWeXpBVUljbFFUOFhlUnBRemtYVW41bUMveWl6WjcwUEtPY2xyc1VBOEdWdy9Tdi91cm5XSjVrU2tGejJMM2giLCJtYWMiOiIzMDE5MWVmNDM2NmIxNjUyZGQ4MTRlYzcxMzg2OGJhNzBjOGU1NTkzNTgyOTc1ZjYyZjZmOWE3ODgwMTljMWU0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETenemigos" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETenemigos"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETenemigos"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETenemigos" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETenemigos">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETenemigos" data-method="GET"
      data-path="enemigos"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETenemigos', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETenemigos"
                    onclick="tryItOut('GETenemigos');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETenemigos"
                    onclick="cancelTryOut('GETenemigos');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETenemigos"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>enemigos</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETenemigos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETenemigos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTenemigos">POST enemigos</h2>

<p>
</p>



<span id="example-requests-POSTenemigos">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/enemigos" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "name=b"\
    --form "health=22"\
    --form "is_hostile=1"\
    --form "basic_attack=67"\
    --form "planet_id=architecto"\
    --form "enemy_type_id=architecto"\
    --form "spritesheet=@C:\Users\Lenovo\AppData\Local\Temp\php8EAC.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/enemigos"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('name', 'b');
body.append('health', '22');
body.append('is_hostile', '1');
body.append('basic_attack', '67');
body.append('planet_id', 'architecto');
body.append('enemy_type_id', 'architecto');
body.append('spritesheet', document.querySelector('input[name="spritesheet"]').files[0]);

fetch(url, {
    method: "POST",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTenemigos">
</span>
<span id="execution-results-POSTenemigos" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTenemigos"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTenemigos"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTenemigos" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTenemigos">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTenemigos" data-method="POST"
      data-path="enemigos"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTenemigos', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTenemigos"
                    onclick="tryItOut('POSTenemigos');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTenemigos"
                    onclick="cancelTryOut('POSTenemigos');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTenemigos"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>enemigos</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTenemigos"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTenemigos"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTenemigos"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>spritesheet</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="spritesheet"                data-endpoint="POSTenemigos"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8EAC.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>health</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="health"                data-endpoint="POSTenemigos"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_hostile</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
 &nbsp;
                <label data-endpoint="POSTenemigos" style="display: none">
            <input type="radio" name="is_hostile"
                   value="true"
                   data-endpoint="POSTenemigos"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="POSTenemigos" style="display: none">
            <input type="radio" name="is_hostile"
                   value="false"
                   data-endpoint="POSTenemigos"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>true</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>basic_attack</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="basic_attack"                data-endpoint="POSTenemigos"
               value="67"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>67</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>planet_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planet_id"                data-endpoint="POSTenemigos"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the planets table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>enemy_type_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="enemy_type_id"                data-endpoint="POSTenemigos"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the enemy_types table. Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-PUTenemigos--enemigo-">PUT enemigos/{enemigo}</h2>

<p>
</p>



<span id="example-requests-PUTenemigos--enemigo-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/enemigos/architecto" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "name=b"\
    --form "health=22"\
    --form "is_hostile=1"\
    --form "basic_attack=67"\
    --form "planet_id=architecto"\
    --form "enemy_type_id=architecto"\
    --form "spritesheet=@C:\Users\Lenovo\AppData\Local\Temp\php8EBC.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/enemigos/architecto"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('name', 'b');
body.append('health', '22');
body.append('is_hostile', '1');
body.append('basic_attack', '67');
body.append('planet_id', 'architecto');
body.append('enemy_type_id', 'architecto');
body.append('spritesheet', document.querySelector('input[name="spritesheet"]').files[0]);

fetch(url, {
    method: "PUT",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTenemigos--enemigo-">
</span>
<span id="execution-results-PUTenemigos--enemigo-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTenemigos--enemigo-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTenemigos--enemigo-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTenemigos--enemigo-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTenemigos--enemigo-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTenemigos--enemigo-" data-method="PUT"
      data-path="enemigos/{enemigo}"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTenemigos--enemigo-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTenemigos--enemigo-"
                    onclick="tryItOut('PUTenemigos--enemigo-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTenemigos--enemigo-"
                    onclick="cancelTryOut('PUTenemigos--enemigo-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTenemigos--enemigo-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>enemigos/{enemigo}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>enemigos/{enemigo}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTenemigos--enemigo-"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTenemigos--enemigo-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>enemigo</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="enemigo"                data-endpoint="PUTenemigos--enemigo-"
               value="architecto"
               data-component="url">
    <br>
<p>The enemigo. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTenemigos--enemigo-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>spritesheet</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="file" style="display: none"
                              name="spritesheet"                data-endpoint="PUTenemigos--enemigo-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8EBC.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>health</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="health"                data-endpoint="PUTenemigos--enemigo-"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_hostile</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
 &nbsp;
                <label data-endpoint="PUTenemigos--enemigo-" style="display: none">
            <input type="radio" name="is_hostile"
                   value="true"
                   data-endpoint="PUTenemigos--enemigo-"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="PUTenemigos--enemigo-" style="display: none">
            <input type="radio" name="is_hostile"
                   value="false"
                   data-endpoint="PUTenemigos--enemigo-"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>true</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>basic_attack</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="basic_attack"                data-endpoint="PUTenemigos--enemigo-"
               value="67"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>67</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>planet_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planet_id"                data-endpoint="PUTenemigos--enemigo-"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the planets table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>enemy_type_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="enemy_type_id"                data-endpoint="PUTenemigos--enemigo-"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the enemy_types table. Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEenemigos--enemigo-">DELETE enemigos/{enemigo}</h2>

<p>
</p>



<span id="example-requests-DELETEenemigos--enemigo-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/enemigos/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/enemigos/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEenemigos--enemigo-">
</span>
<span id="execution-results-DELETEenemigos--enemigo-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEenemigos--enemigo-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEenemigos--enemigo-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEenemigos--enemigo-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEenemigos--enemigo-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEenemigos--enemigo-" data-method="DELETE"
      data-path="enemigos/{enemigo}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEenemigos--enemigo-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEenemigos--enemigo-"
                    onclick="tryItOut('DELETEenemigos--enemigo-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEenemigos--enemigo-"
                    onclick="cancelTryOut('DELETEenemigos--enemigo-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEenemigos--enemigo-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>enemigos/{enemigo}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEenemigos--enemigo-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEenemigos--enemigo-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>enemigo</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="enemigo"                data-endpoint="DELETEenemigos--enemigo-"
               value="architecto"
               data-component="url">
    <br>
<p>The enemigo. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETheroes">GET heroes</h2>

<p>
</p>



<span id="example-requests-GETheroes">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/heroes" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/heroes"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETheroes">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6ImEzRCtIZXRRS21vMVF4LzlESVU3Z3c9PSIsInZhbHVlIjoiMzNwWEJZZXI1TlM3Z0RaMUU3QnppK1AxeUZjOXB2czBSTjR4TmpkWkF4aVY4R0FjVE5LcWNNWW1ubTFhUDZNMXJPRnhZZGRqTTdhMFVFNEJlNmlpTFhRWnNOL2MzOXg2YkdUQ3FxMmVMWGN1SW5DTnVjV0xJYzF2NkRMc3NUQlciLCJtYWMiOiI3ODAwZThkMTI5MDkyYzQ5Mjk5OWExYWMwMTA0NGE1YzBlZTgwODQxNjRmODhkZmFhNDE0MzcxODgwNTNmODE4IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjVQb2VIcVhoV0orYWhEVjFpdjNtOVE9PSIsInZhbHVlIjoia1hadTRPZjdmNTJsNHBhMkVVM2JrL3VQVk5FTGVnQldBZUdOd093NGc0RTVLYVhOclM5MEo4NlpYd2F1TWt4aDFZVjlKcUpQSWx5dnVCYjYvcTFKY0dPVG9mazhvWnJHL2NQRXZ2ZEd4b2lNdVp6MGVLWHUyYVk0NXZ0YlErNGwiLCJtYWMiOiJmYzAxZjRmNDhhMDI3ZGU0MjMxMmFjNmM4NWZjZDFiN2VkN2Y0NmRjZjVhY2Y1ZGQ5MWYwMmE1N2Q0MmJkODNmIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETheroes" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETheroes"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETheroes"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETheroes" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETheroes">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETheroes" data-method="GET"
      data-path="heroes"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETheroes', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETheroes"
                    onclick="tryItOut('GETheroes');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETheroes"
                    onclick="cancelTryOut('GETheroes');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETheroes"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>heroes</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETheroes"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETheroes"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTheroes">POST heroes</h2>

<p>
</p>



<span id="example-requests-POSTheroes">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/heroes" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "name=b"\
    --form "health=22"\
    --form "spritesheet=@C:\Users\Lenovo\AppData\Local\Temp\php8ECD.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/heroes"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('name', 'b');
body.append('health', '22');
body.append('spritesheet', document.querySelector('input[name="spritesheet"]').files[0]);

fetch(url, {
    method: "POST",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTheroes">
</span>
<span id="execution-results-POSTheroes" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTheroes"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTheroes"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTheroes" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTheroes">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTheroes" data-method="POST"
      data-path="heroes"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTheroes', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTheroes"
                    onclick="tryItOut('POSTheroes');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTheroes"
                    onclick="cancelTryOut('POSTheroes');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTheroes"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>heroes</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTheroes"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTheroes"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTheroes"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>spritesheet</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="spritesheet"                data-endpoint="POSTheroes"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8ECD.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>health</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="health"                data-endpoint="POSTheroes"
               value="22"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>22</code></p>
        </div>
        </form>

                    <h2 id="endpoints-PUTheroes--id-">PUT heroes/{id}</h2>

<p>
</p>



<span id="example-requests-PUTheroes--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/heroes/architecto" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "health=16"\
    --form "spritesheet=@C:\Users\Lenovo\AppData\Local\Temp\php8ECE.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/heroes/architecto"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('health', '16');
body.append('spritesheet', document.querySelector('input[name="spritesheet"]').files[0]);

fetch(url, {
    method: "PUT",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTheroes--id-">
</span>
<span id="execution-results-PUTheroes--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTheroes--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTheroes--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTheroes--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTheroes--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTheroes--id-" data-method="PUT"
      data-path="heroes/{id}"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTheroes--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTheroes--id-"
                    onclick="tryItOut('PUTheroes--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTheroes--id-"
                    onclick="cancelTryOut('PUTheroes--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTheroes--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>heroes/{id}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>heroes/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTheroes--id-"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTheroes--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="PUTheroes--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the hero. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTheroes--id-"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>spritesheet</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="file" style="display: none"
                              name="spritesheet"                data-endpoint="PUTheroes--id-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 2048 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8ECE.tmp</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>health</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="health"                data-endpoint="PUTheroes--id-"
               value="16"
               data-component="body">
    <br>
<p>Must be at least 1. Example: <code>16</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETEheroes--id-">DELETE heroes/{id}</h2>

<p>
</p>



<span id="example-requests-DELETEheroes--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/heroes/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/heroes/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEheroes--id-">
</span>
<span id="execution-results-DELETEheroes--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEheroes--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEheroes--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEheroes--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEheroes--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEheroes--id-" data-method="DELETE"
      data-path="heroes/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEheroes--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEheroes--id-"
                    onclick="tryItOut('DELETEheroes--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEheroes--id-"
                    onclick="cancelTryOut('DELETEheroes--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEheroes--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>heroes/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEheroes--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEheroes--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="DELETEheroes--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the hero. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETlugares">GET lugares</h2>

<p>
</p>



<span id="example-requests-GETlugares">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/lugares" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETlugares">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IndyeXQzMGhrd3J5YzYxYVRQTzFCOWc9PSIsInZhbHVlIjoiQ1hZZmxyWER6dlhyeHRBcm5HOWhSQ3laQVJDcmtMaXRXMzMzOUxtVU5mdnJIdklpTUVSR282TEN4TUJCNmk4TkFhRlgrb3pIZU1RQytwRWdNVUxHWUlzeExIYTRKdGZHMEdJczVUSGNMWmM5TDB4K3F6ZzJyVDJ6S3BGc0h1TnMiLCJtYWMiOiI3MWYxNzNkNjAyMjliODhhNTlmOTFkNDk3MDZlYjUwYWU3OWI1YjlmMzdhMTIyYzU0NTJkODBiNThhNTEwODM1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IkhPazNYc0Q2S2l3dHJaZkZ0aThkNGc9PSIsInZhbHVlIjoibTVjVHB0ektBSDh0RStYcU50ZHZrbU9IVjRKNW5CcUExWkVnZ00xYUtKRTE0NTUzbGIxeURwdGtZc01sK0tWY3ozQU81LzZCV3ltYUwvd3FDamczYk5lS0pCdi9sVUVUd3I1VldRK0xQYWMyUEI4QzhkSStvOGt4dFhkd0phT3AiLCJtYWMiOiI1M2ViNmE0NDZmZjk4YzE5ODBkNDZiYWY4Y2UxNTQ2OTNlNjNmOTU1NzdjYjdlZWY2NzgwMjRlY2RhOWFkNjhkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETlugares" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETlugares"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETlugares"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETlugares" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETlugares">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETlugares" data-method="GET"
      data-path="lugares"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETlugares', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETlugares"
                    onclick="tryItOut('GETlugares');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETlugares"
                    onclick="cancelTryOut('GETlugares');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETlugares"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>lugares</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETlugares"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETlugares"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETlugares-crear">GET lugares/crear</h2>

<p>
</p>



<span id="example-requests-GETlugares-crear">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/lugares/crear" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares/crear"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETlugares-crear">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IjA1UGY2QmZ4T25IcDdiUkhZWEtUZFE9PSIsInZhbHVlIjoiYkRBODhweVhZOVQ4OTNldmt5dEdER3QxSi9tQXg3N25zbDBQNnFQRTRFZkwvWk42MWlXNDdNM3JTVFhtallKZ0txanlJTnorcENwTlpYODFVNGZBeFN2Y0plSjNoUllNc3JKYlJEd3gvdzBIR1NHMlZUVGEwTXkwV3FremEwaWYiLCJtYWMiOiJjZmViYjdkZTY4OWQxNDc4NzRiMTQyODJkNzRiYzQ5OTgxZGI2YWYxMDljZDM1MDhmY2QwZWMwOGY2ZTdjNzliIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InF2dWhTcndwcEd1Zi9uOW9LZ2xpckE9PSIsInZhbHVlIjoiZllaZ0d3ZDh5aGhOMlRFQ0w5Y21FSHptTlBCUGdOMmtVOEF6amxXczFtSXBQM3hlU3k5VFJPL3czMkRaaWJiNldqemo5SUthRHo3ZDh4WnZjUmtnOWQwak1qMDBQSlExVElyMzUyODhWZDJNU1dVNlc1VTJEK0h4NDVhR1dXbDkiLCJtYWMiOiI4MzhmM2FmZGQ3OGUxMTc2ZDE0NGNkMDQwMDc5MTAwM2MxNDc2ZTliNTlhOTljMzQ5ZjFjODMxYmE4MmViZDU4IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETlugares-crear" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETlugares-crear"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETlugares-crear"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETlugares-crear" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETlugares-crear">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETlugares-crear" data-method="GET"
      data-path="lugares/crear"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETlugares-crear', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETlugares-crear"
                    onclick="tryItOut('GETlugares-crear');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETlugares-crear"
                    onclick="cancelTryOut('GETlugares-crear');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETlugares-crear"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>lugares/crear</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETlugares-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETlugares-crear"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTlugares">POST lugares</h2>

<p>
</p>



<span id="example-requests-POSTlugares">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/lugares" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "name=b"\
    --form "planet_id=architecto"\
    --form "image=@C:\Users\Lenovo\AppData\Local\Temp\php8EEE.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('name', 'b');
body.append('planet_id', 'architecto');
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "POST",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTlugares">
</span>
<span id="execution-results-POSTlugares" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTlugares"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTlugares"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTlugares" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTlugares">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTlugares" data-method="POST"
      data-path="lugares"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTlugares', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTlugares"
                    onclick="tryItOut('POSTlugares');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTlugares"
                    onclick="cancelTryOut('POSTlugares');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTlugares"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>lugares</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTlugares"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTlugares"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTlugares"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>planet_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="planet_id"                data-endpoint="POSTlugares"
               value="architecto"
               data-component="body">
    <br>
<p>The <code>id</code> of an existing record in the planets table. Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
 &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="POSTlugares"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 5120 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8EEE.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETlugares--lugare-">GET lugares/{lugare}</h2>

<p>
</p>



<span id="example-requests-GETlugares--lugare-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/lugares/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETlugares--lugare-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkUrL0pNMEpjSlpRQTRMekNNV25qM3c9PSIsInZhbHVlIjoiTDRFaHptTmFwcGEwKzdiV3k3SkZ1VFJNZGtKRW5Dc05zSldySmpvTlpFMXRnTlIweFJHSG9mZnVpcEZXU0lCQksxTXc5THQ4Vi80bWlMM056L0ZPRHRTUFZOaG5GZ2hHb3JxQXJQajFOUGxiYjBXbis5d3gyUmw2S3BtaC9NVXQiLCJtYWMiOiJmMzgxMWJmNjIwM2JhMjhlZjY2MzVlNTZiMmM0YWYzYjBhYzk1NWNlMGM3ZWYzYjhiMDQ5ZDU3NWUwZjUyNmIyIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IkNCUVZIVlArZjM0ek9ZemdIb2V2NUE9PSIsInZhbHVlIjoiV1JoeEdjazgvc29vc25VMVNWeHhrbUhQeTNVSmFIRlJtY0pKM1lMZzVLRUhaTnB5dGxMaVZLZkVaeDdleGgwQTVNQlpIc0FxV2l1SXpzNzdKblB2OUJjZENsS2I1Q05raVk0d2UyT1JlWVM3ejhwTVhsRHkybjVibmFKdzY4OVIiLCJtYWMiOiI1NjJlNzUzN2Y5NDAwMGY2NTczNGU2OTY2YmQ1ZmU4ZDJlYTRkMDc3YTJjMGZhZTU5ZGE4ZmEwMTkyODBhNmQ5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETlugares--lugare-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETlugares--lugare-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETlugares--lugare-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETlugares--lugare-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETlugares--lugare-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETlugares--lugare-" data-method="GET"
      data-path="lugares/{lugare}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETlugares--lugare-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETlugares--lugare-"
                    onclick="tryItOut('GETlugares--lugare-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETlugares--lugare-"
                    onclick="cancelTryOut('GETlugares--lugare-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETlugares--lugare-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>lugares/{lugare}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETlugares--lugare-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETlugares--lugare-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>lugare</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="lugare"                data-endpoint="GETlugares--lugare-"
               value="architecto"
               data-component="url">
    <br>
<p>The lugare. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETlugares--lugare--editar">GET lugares/{lugare}/editar</h2>

<p>
</p>



<span id="example-requests-GETlugares--lugare--editar">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/lugares/architecto/editar" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares/architecto/editar"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETlugares--lugare--editar">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IjZCaTFXVlg1QmpEWUtYTFVlNWZ3SGc9PSIsInZhbHVlIjoiMUxuYjRVK1YrWTFucVRjSWROKzdLR2ZEVy96alRVZFh3U2dBS0piRjhYTjNlb283em9QaWh2M1B6Ym9nSnUrSVFrakMzUFhDVmlOK0xjSFliMkxsdUZXdC9XL1ZPMlJ3bVhKYTlCSEtlZFI1UlRUREpuYSs5b0NqRll1UmNnaXciLCJtYWMiOiJiYmFiNzVhYTliZmJkYTRlMTBjMGUzNWFlNTBiMzI1NzliZjhkYmI2NjdmNDg0MmJkNDQxNTY5NjNmODA5MWVhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImsrbXd6NEJqNkZtQVNEa1FHWDRwUWc9PSIsInZhbHVlIjoiWGlPbGZhVlVKTCsvM3VrM0Z6QUNGQTR5aTc2UktpZW8yMHA0R0pFcGg3NjlTNTFjU0xPOVkydWJ4R0tjQnU3RUk0YnRCNGc4UTNyMW1yQlNPeTJjbmVoTzZnTFBMdzN2T2lqbTBmbzdpSDZSUld3djZGRGh6Y3pkU3RWZllnYzkiLCJtYWMiOiI3MzhkMzZlNDVmZTcwZGZhMGRiZDFlNmZjZWQ3MjcxMjFlYjExMzZkNWZhNjExYjhkNGM1ZTA3NTFmODY5MDYwIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETlugares--lugare--editar" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETlugares--lugare--editar"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETlugares--lugare--editar"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETlugares--lugare--editar" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETlugares--lugare--editar">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETlugares--lugare--editar" data-method="GET"
      data-path="lugares/{lugare}/editar"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETlugares--lugare--editar', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETlugares--lugare--editar"
                    onclick="tryItOut('GETlugares--lugare--editar');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETlugares--lugare--editar"
                    onclick="cancelTryOut('GETlugares--lugare--editar');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETlugares--lugare--editar"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>lugares/{lugare}/editar</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETlugares--lugare--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETlugares--lugare--editar"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>lugare</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="lugare"                data-endpoint="GETlugares--lugare--editar"
               value="architecto"
               data-component="url">
    <br>
<p>The lugare. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PUTlugares--lugare-">PUT lugares/{lugare}</h2>

<p>
</p>



<span id="example-requests-PUTlugares--lugare-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/lugares/architecto" \
    --header "Content-Type: multipart/form-data" \
    --header "Accept: application/json" \
    --form "image=@C:\Users\Lenovo\AppData\Local\Temp\php8EFF.tmp" </code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares/architecto"
);

const headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
};

const body = new FormData();
body.append('image', document.querySelector('input[name="image"]').files[0]);

fetch(url, {
    method: "PUT",
    headers,
    body,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTlugares--lugare-">
</span>
<span id="execution-results-PUTlugares--lugare-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTlugares--lugare-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTlugares--lugare-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTlugares--lugare-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTlugares--lugare-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTlugares--lugare-" data-method="PUT"
      data-path="lugares/{lugare}"
      data-authed="0"
      data-hasfiles="1"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTlugares--lugare-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTlugares--lugare-"
                    onclick="tryItOut('PUTlugares--lugare-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTlugares--lugare-"
                    onclick="cancelTryOut('PUTlugares--lugare-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTlugares--lugare-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>lugares/{lugare}</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>lugares/{lugare}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTlugares--lugare-"
               value="multipart/form-data"
               data-component="header">
    <br>
<p>Example: <code>multipart/form-data</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTlugares--lugare-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>lugare</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="lugare"                data-endpoint="PUTlugares--lugare-"
               value="architecto"
               data-component="url">
    <br>
<p>The lugare. Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTlugares--lugare-"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>image</code></b>&nbsp;&nbsp;
<small>file</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="file" style="display: none"
                              name="image"                data-endpoint="PUTlugares--lugare-"
               value=""
               data-component="body">
    <br>
<p>Must be an image. Must not be greater than 5120 kilobytes. Example: <code>C:\Users\Lenovo\AppData\Local\Temp\php8EFF.tmp</code></p>
        </div>
        </form>

                    <h2 id="endpoints-DELETElugares--lugare-">DELETE lugares/{lugare}</h2>

<p>
</p>



<span id="example-requests-DELETElugares--lugare-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/lugares/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETElugares--lugare-">
</span>
<span id="execution-results-DELETElugares--lugare-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETElugares--lugare-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETElugares--lugare-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETElugares--lugare-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETElugares--lugare-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETElugares--lugare-" data-method="DELETE"
      data-path="lugares/{lugare}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETElugares--lugare-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETElugares--lugare-"
                    onclick="tryItOut('DELETElugares--lugare-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETElugares--lugare-"
                    onclick="cancelTryOut('DELETElugares--lugare-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETElugares--lugare-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>lugares/{lugare}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETElugares--lugare-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETElugares--lugare-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>lugare</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="lugare"                data-endpoint="DELETElugares--lugare-"
               value="architecto"
               data-component="url">
    <br>
<p>The lugare. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTlugares--stageId--puntos-vectoriales-sync">POST lugares/{stageId}/puntos-vectoriales/sync</h2>

<p>
</p>



<span id="example-requests-POSTlugares--stageId--puntos-vectoriales-sync">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/lugares/architecto/puntos-vectoriales/sync" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"points\": [
        {
            \"x\": 4326.41688,
            \"y\": 4326.41688
        }
    ]
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/lugares/architecto/puntos-vectoriales/sync"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "points": [
        {
            "x": 4326.41688,
            "y": 4326.41688
        }
    ]
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTlugares--stageId--puntos-vectoriales-sync">
</span>
<span id="execution-results-POSTlugares--stageId--puntos-vectoriales-sync" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTlugares--stageId--puntos-vectoriales-sync"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTlugares--stageId--puntos-vectoriales-sync"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTlugares--stageId--puntos-vectoriales-sync" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTlugares--stageId--puntos-vectoriales-sync">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTlugares--stageId--puntos-vectoriales-sync" data-method="POST"
      data-path="lugares/{stageId}/puntos-vectoriales/sync"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTlugares--stageId--puntos-vectoriales-sync', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTlugares--stageId--puntos-vectoriales-sync"
                    onclick="tryItOut('POSTlugares--stageId--puntos-vectoriales-sync');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTlugares--stageId--puntos-vectoriales-sync"
                    onclick="cancelTryOut('POSTlugares--stageId--puntos-vectoriales-sync');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTlugares--stageId--puntos-vectoriales-sync"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>lugares/{stageId}/puntos-vectoriales/sync</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTlugares--stageId--puntos-vectoriales-sync"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTlugares--stageId--puntos-vectoriales-sync"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>stageId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="stageId"                data-endpoint="POSTlugares--stageId--puntos-vectoriales-sync"
               value="architecto"
               data-component="url">
    <br>
<p>Example: <code>architecto</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
        <details>
            <summary style="padding-bottom: 10px;">
                <b style="line-height: 2;"><code>points</code></b>&nbsp;&nbsp;
<small>object[]</small>&nbsp;
 &nbsp;
<br>

            </summary>
                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>x</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="points.0.x"                data-endpoint="POSTlugares--stageId--puntos-vectoriales-sync"
               value="4326.41688"
               data-component="body">
    <br>
<p>Example: <code>4326.41688</code></p>
                    </div>
                                                                <div style="margin-left: 14px; clear: unset;">
                        <b style="line-height: 2;"><code>y</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="points.0.y"                data-endpoint="POSTlugares--stageId--puntos-vectoriales-sync"
               value="4326.41688"
               data-component="body">
    <br>
<p>Example: <code>4326.41688</code></p>
                    </div>
                                    </details>
        </div>
        </form>

                    <h2 id="endpoints-GETsettings">Invoke the controller method.</h2>

<p>
</p>



<span id="example-requests-GETsettings">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/settings" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/settings"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsettings">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkZIT05tT25uTWpNcXRScnNxWFVSZ2c9PSIsInZhbHVlIjoiOFB4UEJqLzd3ZlJOZzNBbXQraFBoYTNyYWJ1Wm5CZDJ0WUw1dGFrUkVNMDVHNkNub0hkK291cVFxYmM3Nlg1WmZCZnhUZXFHVW9vR1BtVVk3Nm0xd1RCNFJQWHgzL2w1VUpqUnkyRTIvbHZ4ZU5oOTFVZ2VQL0VDV09NdzFucWwiLCJtYWMiOiIwMjgxYzNkMTcxMDgxYTgxNzU2Njg5YmRiYzVkZDk5YTBhODhhY2Q0MWMwZGYwZGYwOGZlMjMwODlmMGM5NDg1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IjlOa2x4TzNzN2h3ckxaNE9XQU9xWnc9PSIsInZhbHVlIjoiQ3ZpYWtkZ2FmY3dma2I1Q1hMMFpHZ0VrQkh3REowb1kvaVpzbGRIOWdzOWtjUVQ4NGtsZTNMKzYyUm5Xc1dBOWE2MHNyT3hpYzRaTElPK0Rsc2loTmtwZW9LVEhEVCtLM1lSQnNSQXFNdTQxYXdENW5TaWhMSkQ0SE1LQjFYRFciLCJtYWMiOiJlNjUyNDMwMTQ5NWFhZDBkZGI4MDg3ZjRjMzhhYjc0ZjY2YWRjYmIyMjk2NDliZDM5NmVkZDYxMTAwOWZhMGRmIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsettings" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsettings"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsettings"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsettings" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsettings">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsettings" data-method="GET"
      data-path="settings"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsettings', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsettings"
                    onclick="tryItOut('GETsettings');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsettings"
                    onclick="cancelTryOut('GETsettings');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsettings"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>settings</code></b>
        </p>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>settings</code></b>
        </p>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>settings</code></b>
        </p>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>settings</code></b>
        </p>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>settings</code></b>
        </p>
            <p>
            <small class="badge badge-grey">OPTIONS</small>
            <b><code>settings</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsettings"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsettings"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETsettings-profile">Show the user&#039;s profile settings page.</h2>

<p>
</p>



<span id="example-requests-GETsettings-profile">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/settings/profile" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/settings/profile"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsettings-profile">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IndJVmV6R05wZUpXRU9FRzNmN0swVFE9PSIsInZhbHVlIjoiZzBOYUtMSTlSZVY4VXFLcDIwZXhuQUFVV1J6TVJUQ0RqN3VIYmhETjNweEdSUEpLRUZUMlR5Q0hkOEp6UzNJN21YTDFySDJSWUs4QnJmL0t4U3ZzdnRUUDlhQkd2VlJhVjRsdXZCN2FxUUM2R0pzMmFYcmJQdnVEQWJFeVp1cnYiLCJtYWMiOiI5OGUxMDEwODY4ZWJjOWY3OWM5NGUwMWVlZTE4ZTEzODY2NDgwYjQ4NDEzOTM5N2Y5ZjVkM2EwMjZlMzFiOGFhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImNobXg4YzdiTXNqRGE2MTNwaVJkcVE9PSIsInZhbHVlIjoidkt4UDc5TWxKV1VlZ1BIU3ZPM0xtNFZnWGI1N0JJV0pPOTZ2bytLcHdtcmV6MEZlZGF6U1FRSGc4ZWRLakdxbVZnbkdKaTZVbHJVU0hUbTRGbWM2T0M4eDRISTRkSUVkODJMOFlidjZkNDc4S2JaczlGNW0xQTNveHBZenRVaWciLCJtYWMiOiI5N2EwODk0NWRlYzkzMWQxMzg0NzNhYjU3YzZmNDcwYzJkZmU1ZjAwMzY5ZWM1MWJlOGYyZTY0MjIwNTVkYTgyIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsettings-profile" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsettings-profile"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsettings-profile"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsettings-profile" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsettings-profile">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsettings-profile" data-method="GET"
      data-path="settings/profile"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsettings-profile', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsettings-profile"
                    onclick="tryItOut('GETsettings-profile');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsettings-profile"
                    onclick="cancelTryOut('GETsettings-profile');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsettings-profile"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>settings/profile</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsettings-profile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsettings-profile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-DELETEsettings-profile">Delete the user&#039;s account.</h2>

<p>
</p>



<span id="example-requests-DELETEsettings-profile">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://gamepa.test/settings/profile" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"password\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/settings/profile"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "password": "architecto"
};

fetch(url, {
    method: "DELETE",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEsettings-profile">
</span>
<span id="execution-results-DELETEsettings-profile" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEsettings-profile"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEsettings-profile"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEsettings-profile" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEsettings-profile">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEsettings-profile" data-method="DELETE"
      data-path="settings/profile"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEsettings-profile', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEsettings-profile"
                    onclick="tryItOut('DELETEsettings-profile');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEsettings-profile"
                    onclick="cancelTryOut('DELETEsettings-profile');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEsettings-profile"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>settings/profile</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEsettings-profile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEsettings-profile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="DELETEsettings-profile"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETsettings-password">Show the user&#039;s password settings page.</h2>

<p>
</p>



<span id="example-requests-GETsettings-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/settings/password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/settings/password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsettings-password">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IjFQN2tWV3RjSUpzWGc0SHZ5OFh2d0E9PSIsInZhbHVlIjoiZ3I2YTMwUCtBTmV6d1Z6VksrL3dCcUszUzUzSDBJbVdFSU1JSm9Tem40QmZDVENRK2cyUHJoZ0g2YVFFWGxNWUI4aEJxOG50eUN0T1owOFRWNEQ3enhCc0dENzh6SVpFQ00yRGpsbDNYcVVmUkpHdFJubmJJNVh1UHoxOVh5TnYiLCJtYWMiOiI3YmNkZWU5MTFhMjA0ZjJlMjZhYTYwM2E5ZmRlMTBmZjhkNGNkZTc5MTg1OTNhZDkwMWRiMzRkNzIzYzNkMzMwIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6InYzT08yUUlGZjVTbXVoMmlsZUJGeWc9PSIsInZhbHVlIjoiZm1tcy9iT2lvbEpBQ3JYNGpTK3QzbzVLUk9xZ1Z1ZC84MjVnUzNnR3gxVXlTWFBPL3F6bzJsdDV4YjYvWDRnZ1Z5Zm43N0htQ0cvWjFZSU05N29QSXdBZHU5c3JwbUNLc2V3cHRwdStUT3pBbFcvbHdLYzZFTFB3OUNHbXFtRFAiLCJtYWMiOiI2OTZjNDA4N2M3ZDExZjZhYTRlNjc2MGVjNzc2MWVjMTUzMGI3MzkxNzNjZmI4ZDQwOTg4MDI5YWViOWRlOTk0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsettings-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsettings-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsettings-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsettings-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsettings-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsettings-password" data-method="GET"
      data-path="settings/password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsettings-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsettings-password"
                    onclick="tryItOut('GETsettings-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsettings-password"
                    onclick="cancelTryOut('GETsettings-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsettings-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>settings/password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsettings-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsettings-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-PUTsettings-password">Update the user&#039;s password.</h2>

<p>
</p>



<span id="example-requests-PUTsettings-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://gamepa.test/settings/password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"current_password\": \"architecto\",
    \"password\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/settings/password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "current_password": "architecto",
    "password": "architecto"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTsettings-password">
</span>
<span id="execution-results-PUTsettings-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTsettings-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTsettings-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTsettings-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTsettings-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTsettings-password" data-method="PUT"
      data-path="settings/password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTsettings-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTsettings-password"
                    onclick="tryItOut('PUTsettings-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTsettings-password"
                    onclick="cancelTryOut('PUTsettings-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTsettings-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>settings/password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTsettings-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTsettings-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>current_password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="current_password"                data-endpoint="PUTsettings-password"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="PUTsettings-password"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETsettings-appearance">GET settings/appearance</h2>

<p>
</p>



<span id="example-requests-GETsettings-appearance">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/settings/appearance" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/settings/appearance"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETsettings-appearance">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlcxUm85R0FoZ1hwZVhNUHJIS0JiTFE9PSIsInZhbHVlIjoiaGxBY3dLd2ZjZFM2VDQwS3VZY1BHSGRDREVEUFlrc21LNWw3SUNDYzhGK3lpblF6Yk9YWFBvMU9JK01sSDl0MlArUWgvWWhGWmhkc0t2NzFOWTFjM2hrQzNUcXI3RnFWclRqcDgycDhMNjh6LzlzNmtHK2EyMHBSeFdXS2JBTksiLCJtYWMiOiI2OGZmMDk0YjIxZDhhMDQxZWNmMGUxMjhjYmIxZWM4MTYwOWE3MjA5ZGRkNGFlN2EwN2E1MzRhMmM4YzIyZjU2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IitINzlFN2NIbEJQU3lQTS91M2xpNEE9PSIsInZhbHVlIjoiVVBxTGdDaURtWVdpRDUzWUNRcjNyZHdKTzErdWlUNG94bHVkQlVsM1dFQ25JRjU3SFdyaVErbkxWYXRSTnk5RmFrakp2V1UvT3F2UWgrOXBDZGhMTHVweDBTbXNaNkFkTDFjc2dCVWdnMHFuNnRGSTc0N0pBOWk1S1JvbVpKeG0iLCJtYWMiOiIzNjgxMzgxMzIyNTM2OGJiMzk2YmQ5NDFkZTBjMzUyMWMxM2RmNmIwYmRiMTM5NDE5ZDhhMjMzZDgyMTA3YjQ2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETsettings-appearance" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETsettings-appearance"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETsettings-appearance"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETsettings-appearance" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETsettings-appearance">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETsettings-appearance" data-method="GET"
      data-path="settings/appearance"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETsettings-appearance', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETsettings-appearance"
                    onclick="tryItOut('GETsettings-appearance');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETsettings-appearance"
                    onclick="cancelTryOut('GETsettings-appearance');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETsettings-appearance"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>settings/appearance</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETsettings-appearance"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETsettings-appearance"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETregister">Show the registration page.</h2>

<p>
</p>



<span id="example-requests-GETregister">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/register" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/register"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETregister">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6Ik5tb0dHN0Iza04veDR5OEJiYmNZYWc9PSIsInZhbHVlIjoiTEdXcUYwaXhjaDZlMzB6ZnNBckp4SHc3aE9xdkJGQ205QThFcVI0T1hRR3FIMU5VdWRGVFRjaEVrTUJPOWNMRG9jRTlNU2ZpK1RVaytVR2ZmTllxU2wwblFlbnl2OWg1cG5QUEhucGtBNEE4T0pTM0hZczNiNkEvYVdySWNLdG0iLCJtYWMiOiIyZDQyYWEyN2FlNjZiM2UwOWY4ODNhZWUzMzg0ZjAwZmEwMTNiMjViODUzMWRlM2RlODViYjE1ZWQ3NDNkMjBkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IlN3WWxmUHNOaG9wK1h3aEVWc1JCdEE9PSIsInZhbHVlIjoiZDdwaGZFZ3ZNb013dk1CZmJWQ3N6MGtVZXIyWjVsVG5IUHQraVl5Y1hPMTlOaHFBaWJ3dEVMNzcvUi9iUDZrOWxBVXZOckJ4N1VCQzM1VkZGdjlJWnlkZGFSUFhvOXJ5QjU5ZTc2RHE0S2FvOHhVT0VtS20veGhDcmErOWliMVMiLCJtYWMiOiJmYmExYTE0MjU3NjZhM2ZlYzRhZTM2NGU0NjRiOTQ5NDkxZWJlYTBkYjEyOTYwOTIwMGI1ZmY4ODJhMzk4OTE2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Server Error&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETregister" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETregister"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETregister"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETregister" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETregister">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETregister" data-method="GET"
      data-path="register"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETregister', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETregister"
                    onclick="tryItOut('GETregister');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETregister"
                    onclick="cancelTryOut('GETregister');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETregister"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>register</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTregister">Handle an incoming registration request.</h2>

<p>
</p>



<span id="example-requests-POSTregister">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/register" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"password\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/register"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "password": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTregister">
</span>
<span id="execution-results-POSTregister" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTregister"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTregister"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTregister" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTregister">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTregister" data-method="POST"
      data-path="register"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTregister', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTregister"
                    onclick="tryItOut('POSTregister');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTregister"
                    onclick="cancelTryOut('POSTregister');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTregister"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>register</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTregister"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTregister"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTregister"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETlogin">Show the login page.</h2>

<p>
</p>



<span id="example-requests-GETlogin">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/login" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/login"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETlogin">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6IllYRFZFTWVQeXlkVFdFdmRVckZEQ0E9PSIsInZhbHVlIjoidGplUU5YeTFHR2MwMjIyVEJkRGE0cC9iMzNqbWlQU1paZCt2azJiMmxrZjU5bzlJMkxiQ1AwMUt3d1kwZHZCRWF4Q2lGeFZobyszeDF6L0x2WXhscXNlZUJZek44WFltZTgyQUpRUnlYVWVxaVRjR2Rvd3dhc1ByZUdqSGFyUHkiLCJtYWMiOiJkZjk0N2E1ZTBhNTBjZGZkODkzOTE3NzdhMDhmMmQ5ZTRkY2Q5NGI0ODBjMWI1YWNmYmM5MmE5YWNmZmIzNjY2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IlZOR24wWi9nUEZLenBQemd5eDFYL3c9PSIsInZhbHVlIjoiMnJHOTRpdk02MUxNYXY3OGhVOFROSDlXd0ozU1ZGRGdUQjNVL0dqZlVEYmxuUTB6TWp6ZEs1cDNXOXZlemltSU5wcmZNSUFaaUNHTmYrVTBxV0J5bE9FaVRmeE5pTXlYaS9RYWJWb2pGNXdhU3Exc2pCTnA2bHoySlZTZ0Y3TG4iLCJtYWMiOiJiNjc3N2YzNjJiNTAzZjAzOTFlZTQxZjQ3MGY0NTQyMTZkYzZjYjUyM2NlNTlhNWI1NGMyZTAxODdhZDRjOGU0IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Server Error&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETlogin" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETlogin"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETlogin"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETlogin" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETlogin">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETlogin" data-method="GET"
      data-path="login"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETlogin', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETlogin"
                    onclick="tryItOut('GETlogin');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETlogin"
                    onclick="cancelTryOut('GETlogin');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETlogin"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>login</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTlogin">Handle an incoming authentication request.</h2>

<p>
</p>



<span id="example-requests-POSTlogin">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/login" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"email\": \"gbailey@example.net\",
    \"password\": \"|]|{+-\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/login"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "gbailey@example.net",
    "password": "|]|{+-"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTlogin">
</span>
<span id="execution-results-POSTlogin" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTlogin"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTlogin"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTlogin" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTlogin">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTlogin" data-method="POST"
      data-path="login"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTlogin', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTlogin"
                    onclick="tryItOut('POSTlogin');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTlogin"
                    onclick="cancelTryOut('POSTlogin');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTlogin"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>login</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTlogin"
               value="gbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>gbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTlogin"
               value="|]|{+-"
               data-component="body">
    <br>
<p>Example: <code>|]|{+-</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETforgot-password">Show the password reset link request page.</h2>

<p>
</p>



<span id="example-requests-GETforgot-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/forgot-password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/forgot-password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETforgot-password">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6IjlaRHpKY0VGdDcwWU15bU53Qkc0OFE9PSIsInZhbHVlIjoiWnQybmJaUE1kR05majZEaVNxTGNnZktKQURJbng4emxYVmtZdUd2Y2haMWRrNnBMTHg2L2hVK25Ed3N0ZFppcDhMWHBLSTZ6aHl4MkFUM1NYbk1pY1k4VWs4czZsdGhEVS9FaGtiWmhaVE1FOFVxYnRvT1R1K0pIdE9XMmxmZUIiLCJtYWMiOiJiN2ZkNzNkNGI0ODc4YjBmOTExNmJkMDAzNjcxNzE2Y2E4ZmJhYzAxN2U3NTViZWZlOTk5YjNlOTEyYzliNjljIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6ImRQZytxVXdPczdBMUdIb1BBQWFRZmc9PSIsInZhbHVlIjoiYjBCa2h0RkFEQndBWk16MFdFQmpEc1BwUzlObTZlSS9ITWlxOEVNSHFtSGRtdGRaZnVkZEFSYW94ZlNBNlo4YkxkQm1kbnpqNE9XMTNaaGR2OUVJdGJBSGNGaVNlc0tMY0pxVkE5aWNiaDdGSnRVYWFRbzFFcGg1cnQ1bkdubVoiLCJtYWMiOiJhNDA5ZThkMmE5ODJjZjM0YjdhMWQyZTdlYjMxNTA4NmI2MGE3ZDEyMDdmZDZmMGQ2MzFjZjc2MTY4NDU3N2IxIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Server Error&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETforgot-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETforgot-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETforgot-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETforgot-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETforgot-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETforgot-password" data-method="GET"
      data-path="forgot-password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETforgot-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETforgot-password"
                    onclick="tryItOut('GETforgot-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETforgot-password"
                    onclick="cancelTryOut('GETforgot-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETforgot-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>forgot-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETforgot-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETforgot-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTforgot-password">Handle an incoming password reset link request.</h2>

<p>
</p>



<span id="example-requests-POSTforgot-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/forgot-password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"email\": \"gbailey@example.net\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/forgot-password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "gbailey@example.net"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTforgot-password">
</span>
<span id="execution-results-POSTforgot-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTforgot-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTforgot-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTforgot-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTforgot-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTforgot-password" data-method="POST"
      data-path="forgot-password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTforgot-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTforgot-password"
                    onclick="tryItOut('POSTforgot-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTforgot-password"
                    onclick="cancelTryOut('POSTforgot-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTforgot-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>forgot-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTforgot-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTforgot-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTforgot-password"
               value="gbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>gbailey@example.net</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETreset-password--token-">Show the password reset page.</h2>

<p>
</p>



<span id="example-requests-GETreset-password--token-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/reset-password/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/reset-password/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETreset-password--token-">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6ImJrUnpndXQ2clVINkVVbkNaWGhFUFE9PSIsInZhbHVlIjoiamwzblA2OG9hNkxoNjNLMEhNSVF6a3VCUnJrMHo1cThmS2NOcVpvQnlkWGNjdWhmZEcvdURROHhnemxpTkpjYUtieU5vQ0lxU0NUV3NpMnRBWXVnUytIWnZ0MWlWQUJiWHZEcTQ3TGZ0R3lJWlZRaVY0WDl2ZjRtTUNoN1hXSEUiLCJtYWMiOiIyOTI4MTRhZGZhZDZmMDZjOGJiOTlhNzc2MWY2MzI1ZjRjYmVlNzJjYWU4Y2ZkNTE2NWFjMzA2YjY1YmUzNzVkIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Ikx0TkV1cXlUSG5uam94OHVBY2NNNnc9PSIsInZhbHVlIjoiU3dYc0EyNWRJNngxMGdIL2NsL1hhTCtyZ3l1YWlCS21TK0FIK2RBQjUvdGdsdys4dGdYWFlKQ3lFU3pSM3Evd2dOYlNlL3FNZUZkUzZQQUZDVHJDU0I0aEhRdjY2c215b2Y3cENmRWdpK2R0NDA1YjJqVGhzaTRuZUROSmM4M1QiLCJtYWMiOiJhODY0Yjg2ODEwNTNmZjQ4YzdlMTJjZTAyZmJmMzNkNjA2Y2M3Y2NmNDZmMDI1MTFmNjMxMTQzNjdkY2UyMzFiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Server Error&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETreset-password--token-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETreset-password--token-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETreset-password--token-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETreset-password--token-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETreset-password--token-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETreset-password--token-" data-method="GET"
      data-path="reset-password/{token}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETreset-password--token-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETreset-password--token-"
                    onclick="tryItOut('GETreset-password--token-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETreset-password--token-"
                    onclick="cancelTryOut('GETreset-password--token-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETreset-password--token-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>reset-password/{token}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETreset-password--token-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETreset-password--token-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>token</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="token"                data-endpoint="GETreset-password--token-"
               value="architecto"
               data-component="url">
    <br>
<p>Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTreset-password">Handle an incoming new password request.</h2>

<p>
</p>



<span id="example-requests-POSTreset-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/reset-password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"token\": \"architecto\",
    \"email\": \"zbailey@example.net\",
    \"password\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/reset-password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "token": "architecto",
    "email": "zbailey@example.net",
    "password": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTreset-password">
</span>
<span id="execution-results-POSTreset-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTreset-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTreset-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTreset-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTreset-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTreset-password" data-method="POST"
      data-path="reset-password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTreset-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTreset-password"
                    onclick="tryItOut('POSTreset-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTreset-password"
                    onclick="cancelTryOut('POSTreset-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTreset-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>reset-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTreset-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTreset-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>token</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="token"                data-endpoint="POSTreset-password"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTreset-password"
               value="zbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>zbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTreset-password"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETverify-email">Show the email verification prompt page.</h2>

<p>
</p>



<span id="example-requests-GETverify-email">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/verify-email" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/verify-email"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETverify-email">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IlhDazdQUVBGOUVJekFKQldscFptNnc9PSIsInZhbHVlIjoiTVNLVzlKejlxUmh5dmxJb2tuVlBoRzdKdm5qY2krSVRPMkxXN2YwTDlHeW9vc2wwb3d6eTUzSGNiSExnTlJCcEpzV1EwdlU2dzVkWjdXalFOOWVEakF2ekhJdUVxU2loNTVwWTdiVjNhMnRIZ1MzTExjYS9BK1VRdlNwNFc4bU8iLCJtYWMiOiI2MGJhZDRlOTJkZWI0MmY1NjlmZTUwZmNiOWU4M2Q4ZGMwYWVlYzJkN2M3ZTg5ZDczZDE1Yzg5ZDc0ODEwYWE4IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6IkhIcWd1YitDWUhDYnBBWlFCd1F3amc9PSIsInZhbHVlIjoieFcvMW81VFI4dGF3OWQrRURNMzVKYkFmbDhUbDB5Q0h6b29pQmIvQXY3QUhIOVlYMXRlZFprYVpiZkZ1ZUJDZHdoSGZMaC9nemdkUzZqazRHUm53WFdWUkR5L0Z3T2d0Rm5vZVBqRk1tbnEwVzNCTVZxN05YUVpaM0dvSG9iem4iLCJtYWMiOiJmMjU2MTFjYTA4OTE3MmQ2MDU0MGZmODNmZTY0MjJhOWI5NzZjN2U1MjFmNmQyNzk2MWY0NWVkYWJhM2NjNmQ5IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETverify-email" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETverify-email"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETverify-email"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETverify-email" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETverify-email">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETverify-email" data-method="GET"
      data-path="verify-email"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETverify-email', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETverify-email"
                    onclick="tryItOut('GETverify-email');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETverify-email"
                    onclick="cancelTryOut('GETverify-email');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETverify-email"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>verify-email</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETverify-email"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETverify-email"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETverify-email--id---hash-">Mark the authenticated user&#039;s email address as verified.</h2>

<p>
</p>



<span id="example-requests-GETverify-email--id---hash-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/verify-email/architecto/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/verify-email/architecto/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETverify-email--id---hash-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IkJESnExZVorQmE2aDQwOWdHNzJITFE9PSIsInZhbHVlIjoic0VZRkczdVBrbEtDKzJIdUx2WU9EZjdYNW5mRTBCdUFvNVJyemkzWkxuOTJhZDBPcFgwck0wTjExMXZ3cG81bDlyUGhQUnhDTDRTRGhZcy9DK3EyUkpPVk9XMmNGaS93aWxoNDR5cUhmUllxclBxZFkzMUYzZzcwaFVjamZQY0QiLCJtYWMiOiI4ZTNiYTY2NTA1YWY3N2I3ZmMzYTJkZDk5NWM1ZWIwYTFhYzBlNTFiYTViMmI2ZWIyNzE3OWY0YzIxODY3NmVhIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Ik5IRmZOR0ozemdpbUk5QkZxUkJYMVE9PSIsInZhbHVlIjoiMzFQYWlvL2NuRnF0VlBaSnpnWVQxRWZURVFxUXFOSUtBS1M4L0o1S1RtODRhUElLQ201bHI5V3BXb2RiaTFhT1MvaU9Sd1AzTFRUdFhuSEYvUXV2cVdtUW82d2xsNVd1RUNGM3ZrQWlzYTNJKzQ3M2ZEM3k1dlhJT0dVcGpHelQiLCJtYWMiOiJiYjJlNjBjOTdhMTk2MDhjNDFiOTkyYTllOGFlNjhlMTY3MjUzOTcwYTQ4NThkOTFhZjkzMDQ2YjJiNGU1M2Q1IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETverify-email--id---hash-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETverify-email--id---hash-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETverify-email--id---hash-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETverify-email--id---hash-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETverify-email--id---hash-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETverify-email--id---hash-" data-method="GET"
      data-path="verify-email/{id}/{hash}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETverify-email--id---hash-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETverify-email--id---hash-"
                    onclick="tryItOut('GETverify-email--id---hash-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETverify-email--id---hash-"
                    onclick="cancelTryOut('GETverify-email--id---hash-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETverify-email--id---hash-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>verify-email/{id}/{hash}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETverify-email--id---hash-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETverify-email--id---hash-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="GETverify-email--id---hash-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the verify email. Example: <code>architecto</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>hash</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="hash"                data-endpoint="GETverify-email--id---hash-"
               value="architecto"
               data-component="url">
    <br>
<p>Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-POSTemail-verification-notification">Send a new email verification notification.</h2>

<p>
</p>



<span id="example-requests-POSTemail-verification-notification">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/email/verification-notification" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/email/verification-notification"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTemail-verification-notification">
</span>
<span id="execution-results-POSTemail-verification-notification" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTemail-verification-notification"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTemail-verification-notification"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTemail-verification-notification" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTemail-verification-notification">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTemail-verification-notification" data-method="POST"
      data-path="email/verification-notification"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTemail-verification-notification', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTemail-verification-notification"
                    onclick="tryItOut('POSTemail-verification-notification');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTemail-verification-notification"
                    onclick="cancelTryOut('POSTemail-verification-notification');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTemail-verification-notification"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>email/verification-notification</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTemail-verification-notification"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTemail-verification-notification"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETconfirm-password">Show the confirm password page.</h2>

<p>
</p>



<span id="example-requests-GETconfirm-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/confirm-password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/confirm-password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETconfirm-password">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6InpaNHNhQm0zU0lZcFY0eDVBYXA2UHc9PSIsInZhbHVlIjoicldUQVF0cFFyUDJ4U0N6OHFKNFVlRFZRZTlNNmNtblBZMll6czBVZlFRNExRdkhOc2hxL3U2UW5HOS9pRFp0Z2RBWW1jZmRCWUtBNHRGMjhieEVXcFRIUjMyKysxRTZJckhHUlVkSFdmQ1VnRXNaOHZUZ1o1em0reDgxTXJQOGkiLCJtYWMiOiI3YTljNmMxNGQ1ZWM4NWMzYWU2ZTVhOWZmNmJkNzlkZTA4NTYyMTU2MzA1YmE1ZGFiNGQ4MTM4ODkxMWFmZGFiIiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; samesite=lax; mathg_session=eyJpdiI6Im95RFhiaW1tcmhxTkdvTTZHZ0xjQkE9PSIsInZhbHVlIjoibkRWalNlK2QzdnhGL1VaZmJuMmtRL0xwVi9zZUdCWGxuSmx2L25jMFljbG8rZ3IxcVQrMEdKYlhPVy9ZMXE1WHBSRGJkbE5WVkZud2ZVdG1UbENOV1Z6bm9DbTgrMnRaeUJDWHJseW40Q2JJNS9EWGpZdkRvYW1Ha2lxTWcwd0MiLCJtYWMiOiI4ZjhmYjVmYjBjMDhkZDMzMzIzZjdiYmE4NDM2ZDMxOTA3YzJkYjhkNjM5NjJjZDZlYTcyZjMxZTg0NWQ0Mjk3IiwidGFnIjoiIn0%3D; expires=Thu, 02 Oct 2025 07:30:38 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETconfirm-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETconfirm-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETconfirm-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETconfirm-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETconfirm-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETconfirm-password" data-method="GET"
      data-path="confirm-password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETconfirm-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETconfirm-password"
                    onclick="tryItOut('GETconfirm-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETconfirm-password"
                    onclick="cancelTryOut('GETconfirm-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETconfirm-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>confirm-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETconfirm-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETconfirm-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTconfirm-password">Confirm the user&#039;s password.</h2>

<p>
</p>



<span id="example-requests-POSTconfirm-password">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/confirm-password" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/confirm-password"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTconfirm-password">
</span>
<span id="execution-results-POSTconfirm-password" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTconfirm-password"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTconfirm-password"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTconfirm-password" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTconfirm-password">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTconfirm-password" data-method="POST"
      data-path="confirm-password"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTconfirm-password', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTconfirm-password"
                    onclick="tryItOut('POSTconfirm-password');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTconfirm-password"
                    onclick="cancelTryOut('POSTconfirm-password');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTconfirm-password"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>confirm-password</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTconfirm-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTconfirm-password"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTlogout">Destroy an authenticated session.</h2>

<p>
</p>



<span id="example-requests-POSTlogout">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://gamepa.test/logout" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/logout"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTlogout">
</span>
<span id="execution-results-POSTlogout" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTlogout"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTlogout"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTlogout" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTlogout">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTlogout" data-method="POST"
      data-path="logout"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTlogout', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTlogout"
                    onclick="tryItOut('POSTlogout');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTlogout"
                    onclick="cancelTryOut('POSTlogout');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTlogout"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>logout</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTlogout"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTlogout"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETstorage--path-">GET storage/{path}</h2>

<p>
</p>



<span id="example-requests-GETstorage--path-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://gamepa.test/storage/|{+-0p" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://gamepa.test/storage/|{+-0p"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETstorage--path-">
            <blockquote>
            <p>Example response (403):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETstorage--path-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETstorage--path-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETstorage--path-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETstorage--path-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETstorage--path-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETstorage--path-" data-method="GET"
      data-path="storage/{path}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETstorage--path-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETstorage--path-"
                    onclick="tryItOut('GETstorage--path-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETstorage--path-"
                    onclick="cancelTryOut('GETstorage--path-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETstorage--path-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>storage/{path}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETstorage--path-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETstorage--path-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>path</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="path"                data-endpoint="GETstorage--path-"
               value="|{+-0p"
               data-component="url">
    <br>
<p>Example: <code>|{+-0p</code></p>
            </div>
                    </form>

            

        
    </div>
    <div class="dark-box">
                    <div class="lang-selector">
                                                        <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                                        <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                            </div>
            </div>
</div>
</body>
</html>
