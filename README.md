# Refactor KeyPoint
1. use lerna to manage two microServices.
2. split to 4 folder in packages.
      - review: the review service
      - product: the product service
      - core: some services shared by review and product, such as db, 3rd service, middleware
      - declare: the interface and type declare shared by other services
3. use typescript instead of javascript
4. use yarn instead of npm
5. add log module, will log every request to the service
6. add ratelimit middleware
7. use yaml config file instead of write config in code
8. use lint to make code clean
9. use nodemon to do daily develop
10. use gitlab.ci and makefile to do ci/cd
11. refactor the code struct with router -> controller -> blls(not in this demo) -> sevices or db
12. use orm (typeorm & mongoose)
13. add test module. just api level, not enough time to write unit test
14. add swagger.json for document
15. refactor the dockerfile. split dockerfile to 2 part. It will make image smaller
16. add cache to 3rd service. I suppose the result from it will never change
17. add CircuitBreaker on 3rd service.
18. add migration
19. use dependency injection in mysqlorm
20. use koa instead of express (just because I'm more familiar with it)

# develop environment
- node: 12.x
- ide: vscode
- pluginRecommend: typescriptHero, it will make your imports clean

# todo
1. add parameters check. can use Validator or ajv
2. add unit test (do not have enough time)
3. can use other framework. recommend: nestjs, midway
4. use config injection instead of writing plain text in code or config file
...(not enough time to do that's all)




# adidas nodeJS Coding Challenge
This repo provides a solution in nodeJS for an architecture with two microservices:
- Reviews, that implements CRUD operations for products reviews
- Products, that exposes a GET endpoint for getting aggregated information from adidas API (https://www.adidas.<country-domain>/api/products/<product-id>) and the reviews microservice

## What we expect from you
- Review the sourcecode and improve it. It has A LOT of parts where it can be improved.
- Don't forget to (over)comment those parts with the reason of your refactor.
- Much better if you use this skeleton as first commit and you add your improvements in different commits in your git repository.
- Use English as coding and documentation language
- Upload your solution to any private GIT repo (GitHub or Bitbucket for instance) and share with us the link

Some ideas of improvement:
### Code
- Clean code: This code should be shared in a team, so coding standards and clean code would be appreaciated.
- Dependency injection: any approach for dependency injection can be high considered if useful
- Typescript or latest EcmaScript code it's always OK :)

### Architecture and performance
- Persistence and availability: which is the best database to use? should we think in having everything on cloud?
- Performance: Imagine these microservices are going to be called by millions of users, so performance and stability is a mandatory requirement
- Security: credendials, editions, communication, etc. should be secure.
- Resilence: 3rd parties can fail. This system has to be available even when they are failing.

### Other
- Testing: Write some tests, unit tests, integration tests, e2e tests. Every testing improvement is welcomed.
- Deployment: Imagine this code is going to increase a lot, so you should deploy in production only what is indeed needed. Any CICD pipeline proposal will be appreciated too.
- Documentation: if you document your API in a standard way, other developers would can integrate with your API in an easy way.
- Logging: logs should be the best approach for finding issues in production. They should be done in a right way.
