package dev.tripmaster.config;

import dev.tripmaster.model.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class MongoDBConfig {


    private final MongoDatabaseFactory mongoDbFactory;

    public MongoDBConfig(MongoDatabaseFactory mongoDbFactory) {
        this.mongoDbFactory = mongoDbFactory;
    }

    @Bean
    public MongoTemplate mongoTemplate() throws UnknownHostException {
        MappingMongoConverter converter = new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory),
                new MongoMappingContext());
        converter.setCustomConversions(customConversions());
        converter.afterPropertiesSet();
        return new MongoTemplate(mongoDbFactory, converter);
    }
    public MongoCustomConversions customConversions() {
        List<Converter<?, ?>> converters = new ArrayList<>();
        converters.add(RoleToStringConverter.INSTANCE);
        converters.add(StringToRoleConverter.INSTANCE);
        return new MongoCustomConversions(converters);
    }
    @WritingConverter
    enum RoleToStringConverter implements Converter<Role, String> {
        INSTANCE;
        public String convert (Role role){
            return role.name();
        }
    }

    @ReadingConverter
    enum StringToRoleConverter implements Converter<String,Role> {
        INSTANCE;
        public Role convert (String name){
            return Role.valueOf(name);
        }
    }
}
