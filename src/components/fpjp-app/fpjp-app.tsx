import { Component, Host, Prop, State, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'fpjp-app',
  styleUrl: 'fpjp-app.css',
  shadow: true,
})
export class FpjpApp {
  @State() private relativePath = "";
  @State() private entryId = "";
  @Prop() basePath  = "";

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;
    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }
    
    console.log(`basePath: ${this.basePath}, baseUri: ${document.baseURI}, relativePath: ${this.relativePath}, documentURL: ${document.URL}`) 

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });
    
    toRelative(location.pathname)
    console.log(`basePath: ${this.basePath}, baseUri: ${document.baseURI}, relativePath: ${this.relativePath}, documentURL: ${document.URL}`)
  }

  render() {
    let component = ""

    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      console.log(absolute)
      window.navigation.navigate(absolute)
    }
  
    if (document.URL.endsWith(window.location.host + "/")) {
      // component = "home"
      component = "overview"
    }

    // const urlWithoutTrailingSlash = document.URL.replace(/\/$/, "");
    // if (urlWithoutTrailingSlash + '/' === document.baseURI) {
    //   component = "overview";
    // }

    if (document.URL.endsWith(this.basePath) || document.URL.endsWith(this.basePath.slice(0, -1))) {
      component = "overview";
    }
    
    if (this.relativePath.startsWith("department/")) {
      component = "equipment";
    }
    
    // console.log(`element: ${element}`)

    const selectComponent = () => {
      if (component === "overview") {
        return (
          <fpjp-department-overview onentry-clicked={(e: CustomEvent<any>) => {
            this.entryId = e.detail.id;
            navigate("./department/" + e.detail.path);
          }}>
          </fpjp-department-overview>
        )
      } else if (component === "equipment") {
        return <fpjp-department base-path={this.basePath} dep-id={this.entryId}></fpjp-department>
      } else if (component === "home") {
        return <h1> Home </h1>
      } else {
        return <h1 class="not-found">404 not found 🦧</h1>
      }
    }
  
    return (
      <Host>
        {selectComponent()}
      </Host>
    );
  }
}
  