package com.hac.finalproject;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class ApplicationConfig extends WebSecurityConfigurerAdapter {

  /**
   * @return - the password encryptor
   */
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * defines an administrator
   * 
   * @param auth
   * @throws Exception
   */
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
        .withUser("admin")
        .password(passwordEncoder().encode("admin"))
        .roles("ADMIN");
  }

  /**
   * configure the admin section authority
   * 
   * @param http
   * @throws Exception
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable().authorizeRequests()
        .antMatchers("/", "/signup", "/signup/proccess").permitAll().and().authorizeRequests().antMatchers("/**")
        .hasRole("USER")
        .and()
        .formLogin()
        .loginPage("/login")
        .permitAll()
        .successHandler(
            (request, response, authentication) -> {
              response.setHeader("Location", "/admin");
              response.setHeader("message", "authenticated"); // <-custom http header as redirection does
                                                              // not allow content inside response body
              response.setStatus(HttpServletResponse.SC_ACCEPTED); // <- redirection status
            })
        .failureHandler(
            (request, response, authenticationException) -> {

              response.setHeader("Location", "/login-error");
              response.setHeader("message", "error");
              response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            })
        .loginProcessingUrl("/admin/login")
        .defaultSuccessUrl("/admin/page/1", true)
        .failureUrl("/admin/login-error")
        .and()
        .logout()
        .logoutSuccessUrl("/")
        .and()
        .exceptionHandling()
        .accessDeniedPage("/403.html");
  }

}