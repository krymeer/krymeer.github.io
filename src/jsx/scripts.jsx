'use strict';

class Header extends React.Component {
    constructor( props )
    {
        super( props );
    }

    render()
    {
        const navItems = this.props.pages.map( ( page, pageIndex ) =>
            <a className={ 'nav__item' + ( ( this.props.page.slug && page.slug === this.props.page.slug ) ? ' nav__item--current' : '' ) } key={ pageIndex } href={ '#' + page.slug }>{ page.title }</a>
        );

        return (
            <header className="wrapper__item">
                <h1 className="head mb-05">Hello World!</h1>
                <nav className="nav">{ navItems }</nav>
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
        if( !this.props.page || !this.props.page.content )
        {
            return null;
        }

        return (
            <main className="wrapper__item">{ this.props.page.content }</main>
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
        this.pages            = [
            {
                slug    : 'home',
                title   : 'Home',
                content : <React.Fragment>
                    <p className="para mb-10">This page is only a stub, yet it is going to be my home page in the future.</p>
                    <p className="para"><span className="text--blue">Stay tuned.</span> Nifty stuff will come soon.</p>
                </React.Fragment>
            },
            {
                slug    : 'about-me',
                title   : 'About me',
                content : <React.Fragment>
                    <p className="para"><span className="text--green">Web developer</span> based in Wrocław, Poland.</p>
                    <p className="para">To be continued.</p>
                </React.Fragment>
            },
            {
                slug    : 'works',
                title   : 'Works',
                content : <React.Fragment>
                    <p className="para mb-10">I have been working at <a className="link" href="https://adagri.com/" target="_blank">Adagri</a> since 2019.</p>
                    <p className="para">You could find some of my personal projects on my <a className="link" href="https://github.com/krymeer" target="_blank">GitHub repo</a>.</p>
                </React.Fragment>
            },
            {
                slug    : 'hobbies', 
                title   : 'Hobbies',
                content : <React.Fragment>
                    <p className="para">Half-marathoner, blood donor, genealogist, pastry chef and traveller. </p>
                </React.Fragment>
            }
        ];
        this.state            = {
            page : this.getPage()
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

    getPage()
    {
        const thisSlug = window.location.hash.substring( 1 );
        let thisPage   = this.pages.find( page => ( !thisSlug && page.slug === 'home' ) || thisSlug === page.slug );
        document.title = thisPage.title + ' - ' + document.title.replace( /^[^\-]+- /, '' );

        return thisPage;
    }

    handleHashChange()
    {
        this.setState( {
            page : this.getPage()
        } );
    }

    render()
    {
        return (
            <div className="wrapper wrapper--inner">
                <Header pages={ this.pages } page={ this.state.page } />
                <Main page={ this.state.page } />
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