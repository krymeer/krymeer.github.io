'use strict';

class Header extends React.Component {
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return (
            <header>
                <h1>Hello World!</h1>
                <nav>
                    <a href="#home">Home</a>
                    <a href="#about-me">About me</a>
                    <a href="#works">Works</a>
                    <a href="#hobbies">Hobbies</a>
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
            <main>
                <p>This page is only a stub, yet it is going to be my home page in the future.</p>
                <p><span className="text-blue">Stay tuned.</span> Nifty stuff will come soon.</p>
                <p>The page you are looking at now is <span className="text-green">{ this.props.pageName }</span>.</p>
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
            <footer>
                <p>&copy; 2021 Krzysztof R. Osada</p>
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
            <div className="container">
                <Header />
                <Main pageName={ this.state.pageName } />
                <Footer />
            </div>
        );
    }
}

window.addEventListener( 'load', () => {
    let wrapper = document.getElementById( 'wrapper' );

    if( wrapper !== null )
    {
        ReactDOM.render( <App/>, wrapper );
    }
} );