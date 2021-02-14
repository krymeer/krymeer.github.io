'use strict';

class Header extends React.Component {
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return (
            <header className="wrapper__item">
                <h1 className="head mb-05">Hello World!</h1>
                <nav className="nav">
                    <a className="nav__item" href="#home">Home</a>
                    <a className="nav__item" href="#about-me">About me</a>
                    <a className="nav__item" href="#works">Works</a>
                    <a className="nav__item" href="#hobbies">Hobbies</a>
                </nav>
            </header>
        );
    }
}

class Main extends React.Component {
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return (
            <main className="wrapper__item">
                <p className="para mb-10">This page is only a stub, yet it is going to be my home page in the future.</p>
                <p className="para mb-10"><span className="text--blue">Stay tuned.</span> Nifty stuff will come soon.</p>
                <p className="para">The page you are looking at now is <span className="text--green">{ this.props.pageName }</span>.</p>
            </main>
        );
    }
}


class Footer extends React.Component {
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return (
            <footer className="wrapper__item">
                <p className="para">&copy; 2021 Krzysztof R. Osada</p>
            </footer>
        );
    }
}

class App extends React.Component {
    constructor( props )
    {
        super( props );
        this.handleHashChange = this.handleHashChange.bind( this );
        this.state            = {
            pageName : this.getPageName()
        }
    }

    componentDidMount()
    {
        window.addEventListener( 'hashchange', this.handleHashChange );
    }

    componentWillUnmount()
    {
        window.removeEventListener( 'hashchange', this.handleHashChange );
    }

    getPageName()
    {
        let pageName;

        switch( window.location.hash.substring( 1 ) )
        {
            case 'about-me':
                pageName = 'About me';
                break;
            case 'works':
                pageName = 'Works';
                break;
            case 'hobbies':
                pageName = 'Hobbies';
                break;
            case 'home':
            default:
                pageName = 'Home';
        }

        return pageName;
    }

    handleHashChange()
    {
        this.setState( {
            pageName : this.getPageName()
        } );
    }

    render()
    {

        return (
            <div className="wrapper wrapper--inner">
                <Header />
                <Main pageName={ this.state.pageName } />
                <Footer />
            </div>
        );
    }
}

window.addEventListener( 'load', () => {
    let appWrapper = document.getElementById( 'app-wrapper' )

    if( !appWrapper )
    {
        return false;
    }

    ReactDOM.render( <App />, appWrapper );
} );