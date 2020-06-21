APP_PKG := $(shell echo ${PWD} | sed -e "s\#${GOPATH}/src/\#\#g")
APP_VERSION := $(shell git describe --tags)
BUILD_TIME := $(shell date -u +"%FT%TZ")
DOCKER_REGISTRY_DAILY := daily.docker.net
DOCKER_REGISTRY_PRODUCTION := release.docker.net
DOCKER_GROUP := adidas
DOCKER_REVIEW_PREFIX := adidas-review
DOCKER_PRODUCT_PREFIX := adidas-product
JENKINS_REVIEW_JOB_DAILY := adidas-review
JENKINS_PRODUCT_JOB_DAILY := adidas-product
JENKINS_HOST_DAILY := http://192.168.0.1:8999
REVIEW_IMAGE_TAG := ${DOCKER_REVIEW_PREFIX}:${APP_VERSION}
PRODUCT_IMAGE_TAG := ${DOCKER_PRODUCT_PREFIX}:${APP_VERSION}
REVIEW_IMAGE_NAME := ${DOCKER_REVIEW_PREFIX}:${CI_COMMIT_SHA}
PRODUCT_IMAGE_NAME := ${DOCKER_PRODUCT_PREFIX}:${CI_COMMIT_SHA}

test_docker_compose:
	@npm run build
	@rm -rf ./tmp
	@trap "docker-compose down ; rm -rf ./tmp" SIGINT SIGTERM \
	&& docker-compose up -d \
	&& NODE_ENV=tman ./node_modules/.bin/tman 'server/test/**/*.js' \
	; docker-compose down
	@rm -rf ./tmp

test_ci:
	@docker-compose up -d \
	&& NODE_ENV=tman istanbul cover _tman 'server/test/**/*.js'

.PHONY: build-review
build-review:
	npm run build
	sed 's/"version".*/"version": "1.0.0",/g' ./packages/review/package.json > ./packages/review/package.json.swp
	sed 's/"version".*/"version": "1.0.0",/g' ./packages/core/package.json > ./packages/core/package.json.swp
	sed 's/"version".*/"version": "1.0.0",/g' ./packages/declare/package.json > ./packages/declare/package.json.swp
	docker build \
  --build-arg BUILD_TIME=${BUILD_TIME} \
  --build-arg BUILD_COMMIT=${BUILD_COMMIT} \
	--build-arg BUILD_AUTHOR=${GITLAB_USER_NAME} \
	--build-arg BUILD_ID=${CI_COMMIT_SHA} \
	--build-arg PACKAGE=review \
	--build-arg RUNCMD='npm run start:review' \
  -t ${REVIEW_IMAGE_NAME} .

.PHONY: build-product
build-product:
	npm run build
	sed 's/"version".*/"version": "1.0.0",/g' ./packages/product/package.json > ./packages/product/package.json.swp
	sed 's/"version".*/"version": "1.0.0",/g' ./packages/core/package.json > ./packages/core/package.json.swp
	sed 's/"version".*/"version": "1.0.0",/g' ./packages/declare/package.json > ./packages/declare/package.json.swp
	docker build \
  --build-arg BUILD_TIME=${BUILD_TIME} \
  --build-arg BUILD_COMMIT=${BUILD_COMMIT} \
	--build-arg BUILD_AUTHOR=${GITLAB_USER_NAME} \
	--build-arg BUILD_ID=${CI_COMMIT_SHA} \
	--build-arg PACKAGE=product \
	--build-arg RUNCMD='npm run start:product' \
  -t ${PRODUCT_IMAGE_NAME} .

.PHONY: push-review-daily
push-review-daily:
	docker tag ${REVIEW_IMAGE_NAME} ${DOCKER_REGISTRY_DAILY}/${DOCKER_GROUP}/${REVIEW_IMAGE_NAME}
	docker push ${DOCKER_REGISTRY_DAILY}/${DOCKER_GROUP}/${REVIEW_IMAGE_NAME}

.PHONY: push-product-daily
push-product-daily:
	docker tag ${PRODUCT_IMAGE_NAME} ${DOCKER_REGISTRY_DAILY}/${DOCKER_GROUP}/${PRODUCT_IMAGE_NAME}
	docker push ${DOCKER_REGISTRY_DAILY}/${DOCKER_GROUP}/${PRODUCT_IMAGE_NAME}

.PHONY: deploy-review
deploy-review:
	ci-tool jenkins run \
		--job ${JENKINS_REVIEW_JOB_DAILY} \
		--token ${JENKINS_TOKEN_DAILY} \
		--host ${JENKINS_HOST_DAILY} \
		--PARAM_IMAGE_TAG ${CI_COMMIT_SHA} \
		--PARAM_NODEPORT 3027 \

.PHONY: deploy-product
deploy-product:
	ci-tool jenkins run \
		--job ${JENKINS_PRODUCT_JOB_DAILY} \
		--token ${JENKINS_TOKEN_DAILY} \
		--host ${JENKINS_HOST_DAILY} \
		--PARAM_IMAGE_TAG ${CI_COMMIT_SHA} \
		--PARAM_NODEPORT 3028 \

.PHONY: push-review-production
push-review-production:
	docker tag ${REVIEW_IMAGE_NAME} ${DOCKER_REGISTRY_PRODUCTION}/${DOCKER_GROUP}/${REVIEW_IMAGE_TAG}
	docker push ${DOCKER_REGISTRY_PRODUCTION}/${DOCKER_GROUP}/${REVIEW_IMAGE_TAG}

.PHONY: push-product-production
push-product-production:
	docker tag ${PRODUCT_IMAGE_NAME} ${DOCKER_REGISTRY_PRODUCTION}/${DOCKER_GROUP}/${PRODUCT_IMAGE_TAG}
	docker push ${DOCKER_REGISTRY_PRODUCTION}/${DOCKER_GROUP}/${PRODUCT_IMAGE_TAG}

