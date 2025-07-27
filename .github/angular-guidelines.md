---
description: 'Angular 17 coding standards and best practices'
applyTo: '**/*.ts, **/*.html, **/*.scss, **/*.css'
---

# Angular 17 Development Instructions

Instructions for building high-quality Angular applications using Angular v17.0.0, TypeScript, Angular Signals for state management, and modern Angular best practices. Official references: [angular.dev](https://angular.dev)

## Project Context
- Target Angular **v17.0.0**
- Use **standalone components** by default (no need for NgModules unless explicitly required)
- Angular CLI for project setup and scaffolding
- Use **Zoneless applications** with `provideZoneChangeDetection('noop')` (optional, recommended with Signals)
- TypeScript with strict mode enabled
- Follow the [Angular Style Guide](https://angular.dev/style-guide)
- Prefer Angular Material or modern UI libraries for consistent design (if specified)

## Development Standards

### Architecture
- Structure code by **feature/domain folders** for maintainability
- Use **lazy loading** with `loadComponent` or `loadChildren` for performance
- Apply **dependency injection** using `inject()` instead of constructor where appropriate
- Separate smart (container) and presentational components
- Use **standalone APIs** throughout (standalone pipes, components, directives)

### TypeScript
- Enable `"strict": true` in `tsconfig.json`
- Define precise interfaces and types for components, services, and models
- Use type guards, literal types, and discriminated unions for safety
- Handle errors gracefully with RxJS (`catchError`, `retry`, etc.)
- Use strongly typed **reactive forms** (`FormGroup`, `FormControl`, `Validators`)

### Component Design
- Use Angular’s **standalone components** and APIs
- Use **lifecycle hooks** appropriately (`ngOnInit`, `ngAfterViewInit`, etc.)
- Prefer **Signal-based inputs and outputs** where possible
- Use `ChangeDetectionStrategy.OnPush` for performance
- Implement `@input()`, `@output()` or new functions (`input()`, `output()`) when targeting Angular 17+ with Zóneless setups
- Leverage new **control flow syntax** (`@if`, `@for`, `@switch`) in templates
- Use **@defer** for lazy-loading parts of the template

### Styling
- Use **SCSS** with Angular component style encapsulation
- Follow Angular Material theming guidelines if used
- Prefer **CSS Grid** and **Flexbox** for responsive layout
- Ensure accessibility with semantic HTML and ARIA roles
- Stick to BEM naming conventions where applicable

### State Management
- Use **Angular Signals** (`signal()`, `computed()`, `effect()`) for component and shared state
- Avoid unnecessary third-party state management unless app complexity demands it
- Use **writable signals** for mutable data, **computed signals** for derived data
- Handle loading/error states with signals and template control flow (`@if`, `@defer`)
- Combine Signals with RxJS where needed, use `toObservable()` and `fromSignal()`
- Avoid `NgRx` or `BehaviorSubject` unless Signals are insufficient for your needs

### Data Fetching
- Use Angular’s `HttpClient` with typed interfaces
- Wrap API responses in Signals for reactive updates
- Handle errors using interceptors or within effects
- Use `inject(HttpClient)` in standalone services
- Use `shareReplay()` for caching, avoid duplicate API calls
- Provide meaningful feedback to users during loading or error states

### Template Syntax (v17+)
- Prefer `@if`, `@for`, `@switch` over `*ngIf`, `*ngFor`, etc.
- Use `@defer` for loading large components, improving performance
- Keep templates clean and simple—push logic into component classes
- Use pipes and directives to encapsulate reusable behavior

### Security
- Sanitize input with Angular's built-in sanitization
- Use route guards for authentication and role-based access
- Add HTTP interceptors for authorization headers, CSRF protection
- Validate all form inputs both client- and server-side
- Avoid direct DOM access (`ElementRef.nativeElement`) unless absolutely necessary

### Performance
- Use `OnPush` change detection for performance-sensitive components
- Combine Signals and `effect()` for fine-grained reactive updates
- Lazy load routes and heavy components
- Use `trackBy` in `@for` loops
- Use SSR or SSG via **Angular Universal** for better SEO and load time

### Testing
- Unit test components, services, pipes with **Jasmine & Karma** or **Vitest** (if set up)
- Use Angular’s `TestBed` and `ComponentFixture` for component tests
- Test signal behavior using Angular’s testing tools (`runInInjectionContext`, etc.)
- Use **Playwright** or **Cypress** for end-to-end testing
- Mock APIs with `HttpClientTestingModule`
- Maintain at least **80%+ code coverage** for business logic

## Implementation Process

1. Plan app architecture with features/domains in mind
2. Enable strict mode in `tsconfig.json`
3. Scaffold project using Angular CLI with `--standalone` flag
4. Define models, interfaces, and shared types
5. Build standalone components, directives, pipes
6. Implement APIs and reactive services using signals
7. Handle form validation and user input
8. Apply SCSS styling and theming
9. Add guards and interceptors
10. Use `@defer`, `@if`, and signals for UI logic
11. Write unit and e2e tests
12. Optimize bundle and enable SSR (if needed)

## Additional Guidelines

- Use Angular CLI generators (`ng generate component|service|pipe`)
- Name files consistently: `feature-name.component.ts`, `feature-name.service.ts`
- Add JSDoc for public APIs and business logic
- Ensure **WCAG 2.1** accessibility standards
- Use `i18n` APIs for multilingual support if needed
- Avoid duplication: extract reusable code into shared utilities
- Stick to Signals throughout the app where possible
- Prefer pure, functional programming practices where it improves readability

---

Let's build modern, reactive, scalable Angular 17 apps! 🚀
